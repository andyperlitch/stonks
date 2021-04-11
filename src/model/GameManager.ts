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
  playerColor: string
  playerAvatar: string
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

  public async initGame({
    options,
    user,
    nickname,
    playerAvatar,
    playerColor,
  }: InitGameOptions) {
    this.gameState = new GameState(options)
    this.gameState.initStonks()
    this.addUserPlayer({
      nickname,
      avatar: playerAvatar,
      color: playerColor,
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

  public async cancel() {
    this.gameState.stop('CANCELLED')
    await this.save()
    this.emitGameUpdate()
  }

  public setTimerForNextRound() {
    if (this.isCompleted()) {
      return
    }
    const timeTilNextRound = this.gameState.roundEndTime - Date.now()
    if (timeTilNextRound <= 0) {
      this.gameState.nextRound()
      this.emitGameUpdate()
      this.setTimerForNextRound()
      this.save()
      return
    }
    setTimeout(() => {
      this.setTimerForNextRound()
    }, timeTilNextRound + 100)
  }

  public runUpdateLoop() {
    if (this.gameState.status === 'IN_PROGRESS') {
      this.applyDueStonkChanges()
      this.doOutsideMarketMovement()
      this.emitGameUpdate()
      setTimeout(() => {
        this.runUpdateLoop()
      }, UPDATE_INTERVAL)
    }
  }

  public applyDueStonkChanges() {
    // apply changes
    Object.keys(this.gameState.stonks).forEach((ticker) => {
      const stonk = this.gameState.stonks[ticker]
      stonk.applyDueChanges()
    })
  }

  public doOutsideMarketMovement() {
    // pick a random number
    const rando = Math.random()

    // for each stonk, look at the bullPercent to see if rando is a buy or sell
    Object.values(this.gameState.stonks).forEach((stonk) => {
      if (rando <= stonk.bullPercent) {
        // do a buy
        stonk.buy(1)
      } else {
        // do a sell
        stonk.sell(1)
      }
    })
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
      rounds: state.rounds,
      config: state.config,
      players: state.players,
      stonks: state.stonks,
    }
  }

  public getGameHistory(): types.GameHistoricalPoint[] {
    return this.history
  }

  public hasUser(userId: string): boolean {
    return Boolean(this.users[userId])
  }

  public checkCode(code: string): boolean {
    return this.entryCode === code
  }

  public addUserPlayer({
    nickname,
    avatar,
    color,
    userId,
    isOwner = false,
  }: {
    nickname: string
    avatar: string
    color: string
    userId: string
    isOwner?: boolean
  }) {
    if (this.gameState.players[nickname]) {
      throw new Error(
        `Cannot add a player with the same nickname (${nickname})`,
      )
    }
    this.gameState.addPlayer({ nickname, avatar, color }, isOwner)
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
    socket.on('chat', ({ gameId, message }) => {
      if (gameId !== this.gameId) {
        return
      }
      this.io.to(this.gameId).emit('game:chat', {
        id: this.gameId,
        message,
        nickname,
      })
    })
    this.emitGameUpdate()
  }

  public emitGameUpdate() {
    const ts = Date.now()
    this.recordStateToHistory(ts)
    if (this.io) {
      this.io.to(this.gameId).emit('game:update', {
        id: this.gameId,
        game: this.gameToJSON(),
        ts,
      })
    } else {
      this.waitingForIo.push((io) => {
        io.to(this.gameId).emit('game:update', {
          id: this.gameId,
          game: this.gameToJSON(),
          ts,
        })
      })
    }
  }

  /**
   * Creates a new GameHistoricalPoint and adds it to the history
   */
  private recordStateToHistory(ts: number) {
    const state = this.gameState.toJSON()
    const point: types.GameHistoricalPoint = {
      ts,
      round: state.round,
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
