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
  public io: Server
  /**
   * The corresponding typeorm instance of the game
   */
  public record: GameRecord
  /**
   * Maps user ids to nicknames
   */
  public users: { [userId: string]: string } = {}

  public userSockets: { [nickname: string]: Socket } = {}

  public history: types.GameHistoricalPoint[] = []

  constructor() {
    setInterval(() => {
      if (this.io && this.gameId && !this.isCompleted()) {
        this.io.to(this.gameId).emit('game:update', {
          game: this.gameToJSON(),
        })
      }
    }, 2000)
  }

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

  public get gameId() {
    return this.record?.id
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
      owner: state.owner,
      status: state.status,
      round: state.round,
      roundEndTime: state.roundEndTime,
      config: state.config,
      history: this.history,
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

  public subscribeUserToGame(userId: string, socket: Socket) {
    const nickname = this.users[userId]
    if (!nickname) {
      throw new Error(`User with id ${userId} not found in game ${this.gameId}`)
    }
    this.userSockets[nickname] = socket
    socket.join(this.gameId)
    console.log(`subscribing ${userId} to ${this.gameId}`)
    this.emitGameUpdate()
  }

  public emitGameUpdate() {
    this.io.to(this.gameId).emit('game:update', {
      id: this.gameId,
      game: this.gameToJSON(),
    })
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
