import { Socket, Server } from 'socket.io'
import randomString from 'crypto-random-string'
import { getRepository } from 'typeorm'
import { User } from './../entity/User'
import { Game as GameRecord } from './../entity/Game'
import * as types from '../types/game'
import { Game as GameState } from './Game'

interface InitGameOptions {
  options: Partial<types.GameConfig>
  user: User
  nickname: string
}

const UPDATE_INTERVAL = 2000
const COMPLETE_STATUSES: types.GameStatus[] = ['CANCELLED', 'COMPLETE']

const generateEntryCode = async (): Promise<string> => {
  // generate a code
  const code = randomString({ length: 4, type: 'distinguishable' })

  // check if its a code for any other active game
  const gameRepo = getRepository(GameRecord)
  const existing = await gameRepo.find({
    where: { completed: false, code },
  })
  if (existing.length) {
    // TODO: protect against going too long
    return generateEntryCode()
  }

  // otherwise return the generated code
  return code
}

export default class GameManager {
  /**
   * The passcode for entering the game
   */
  public entryCode: string
  /**
   * The Game being managed
   */
  public gameState: GameState
  /**
   * Reference to the map which stores sockets by userId (session id)
   */
  public userIdToSocket: Map<string, Socket>
  /**
   * The io server object, for use when sending messages
   */
  public get io(): Server {
    return this._io
  }
  public set io(io: Server) {
    this._io = io
    this.waitingForIo.forEach((fn) => fn(io))
  }
  private _io: Server
  /**
   * The corresponding typeorm instance of the game
   */
  public record: GameRecord
  /**
   * Maps user ids to nicknames
   */
  public users: { [userId: string]: string } = {}

  /**
   * Maps nicknames to socket connections
   */
  public userSockets: { [nickname: string]: Socket } = {}

  /**
   * Holds the history of the game
   */
  public history: types.GameHistoricalPoint[] = []

  /**
   * Callbacks to call when io server has been set
   */
  private waitingForIo: ((io: Server) => void)[] = []

  constructor() {}

  public async initGame({ options, user, nickname }: InitGameOptions) {
    this.gameState = new GameState(options)
    this.gameState.initStonks()
    this.addUserPlayer({
      nickname,
      userId: user.id,
      isOwner: true,
    })
    this.entryCode = await generateEntryCode()
    await this.save()
  }

  public isOwner(userId: string) {
    const nickname = this.users[userId]

    if (!nickname) {
      return false
    }

    return this.gameState.owner.name === nickname
  }

  public get gameId() {
    return this.record?.id
  }

  public start() {
    this.gameState.start()
    // kick off update timer
    this.runUpdateLoop()
    // get timer for next round to start
    this.setTimerForNextRound()
    this.save()
  }

  private setTimerForNextRound() {
    if (this.isCompleted()) {
      return
    }
    const timeTilNextRound = this.gameState.roundEndTime - Date.now()
    if (timeTilNextRound <= 0) {
      this.gameState.nextRound()
      this.setTimerForNextRound()
      return
    }
    setTimeout(() => {
      this.setTimerForNextRound()
    }, timeTilNextRound)
  }

  public runUpdateLoop() {
    this.emitGameUpdate()
    this.recordStateToHistory()
    if (this.gameState.status === 'IN_PROGRESS') {
      setTimeout(() => {
        this.runUpdateLoop()
      }, UPDATE_INTERVAL)
    }
  }

  public async save() {
    const gameRepo = getRepository(GameRecord)
    const game = gameRepo.create({
      id: this.gameId,
      code: this.entryCode,
      game: this.gameToJSON(),
      users: this.users,
    })
    this.record = await gameRepo.save(game)
  }

  public gameToJSON(): types.Game {
    const state = this.gameState.toJSON()
    return {
      id: this.gameId,
      owner: state.owner,
      status: state.status,
      round: state.round,
      roundEndTime: state.roundEndTime,
      config: state.config,
      players: state.players,
      stonks: state.stonks,
    }
  }

  public hasUser(userId: string): boolean {
    return Boolean(this.users[userId])
  }

  public checkCode(code: string): boolean {
    return this.entryCode === code
  }

  public addUserPlayer({
    nickname,
    userId,
    isOwner = false,
  }: {
    nickname: string
    userId: string
    isOwner?: boolean
  }) {
    if (this.gameState.players[nickname]) {
      throw new Error(
        `Cannot add a player with the same nickname (${nickname})`,
      )
    }
    this.gameState.addPlayer(nickname, isOwner)
    this.users[userId] = nickname
    const socket = this.userIdToSocket.get(userId)
    if (socket) {
      this.subscribeUserToGame(userId, socket)
    }
  }

  public isCompleted() {
    return COMPLETE_STATUSES.includes(this.gameState.status)
  }

  public isInProgress() {
    return this.gameState.status === 'IN_PROGRESS'
  }

  public subscribeUserToGame(userId: string, socket: Socket) {
    const nickname = this.users[userId]
    if (!nickname) {
      throw new Error(`User with id ${userId} not found in game ${this.gameId}`)
    }
    this.userSockets[nickname] = socket
    socket.join(this.gameId)
    console.log(`subscribing ${userId} to ${this.gameId}`)
    socket.on('buy', ({ gameId, ticker, shares }) => {
      if (gameId !== this.gameId) {
        return
      }
      console.log(
        `${nickname} issued buy request for ${shares} share(s) of ${ticker}`,
      )
      this.gameState.buy(nickname, ticker, shares)
    })
    socket.on('sell', ({ gameId, ticker, shares }) => {
      if (gameId !== this.gameId) {
        return
      }
      console.log(
        `${nickname} issued sell request for ${shares} share(s) of ${ticker}`,
      )
      this.gameState.sell(nickname, ticker, shares)
    })
    this.emitGameUpdate()
  }

  public emitGameUpdate() {
    if (this.io) {
      this.io.to(this.gameId).emit('game:update', {
        id: this.gameId,
        game: this.gameToJSON(),
      })
    } else {
      this.waitingForIo.push((io) => {
        io.to(this.gameId).emit('game:update', {
          id: this.gameId,
          game: this.gameToJSON(),
        })
      })
    }
  }

  /**
   * Creates a new GameHistoricalPoint and adds it to the history
   */
  private recordStateToHistory() {
    const state = this.gameState.toJSON()
    const ts = Date.now()
    const point: types.GameHistoricalPoint = {
      ts,
      players: Object.values(state.players).reduce((acc, player) => {
        acc[player.name] = player
        return acc
      }, {} as types.PlayersHistoryPoint),
      stonks: Object.values(state.stonks).reduce((acc, stonk) => {
        acc[stonk.ticker] = stonk
        return acc
      }, {} as types.StonksHistoryPoint),
    }
    this.history.push(point)
  }

  public static async hydrateGameById({
    gameId,
    record: _record,
  }: {
    gameId: string
    record?: GameRecord
  }): Promise<GameManager> {
    const gameRepo = getRepository(GameRecord)
    let record: GameRecord = _record as GameRecord

    if (!_record) {
      record = (await gameRepo.findOne(gameId)) as GameRecord
      if (!record) {
        throw new Error(`Could not find game with id ${gameId}`)
      }
    }
    const gameManager = new GameManager()
    gameManager.record = record
    gameManager.gameState = GameState.fromJSON(record.game)
    gameManager.users = record.users
    gameManager.entryCode = record.code
    return gameManager
  }

  public static async hydrateGameByCode({
    code,
  }: {
    code: string
  }): Promise<GameManager> {
    const gameRepo = getRepository(GameRecord)
    const record = await gameRepo.findOne({
      where: {
        code,
      },
    })

    if (!record) {
      throw new Error(`Could not find game with code ${code}`)
    }
    const gameManager = new GameManager()
    gameManager.record = record
    gameManager.gameState = GameState.fromJSON(record.game)
    gameManager.users = record.users
    gameManager.entryCode = record.code
    return gameManager
  }
}
