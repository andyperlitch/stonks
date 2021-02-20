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

export default class GameManager {
  /**
   * The unique id of the game. This will be null until .save() is called for the first time.
   */
  public gameId: string
  /**
   * The passcode for entering the game
   */
  public entryCode = randomString({ length: 4 }).toLowerCase()
  /**
   * The Game being managed
   */
  public gameState: GameState
  /**
   * The corresponding typeorm instance of the game
   */
  public record: GameRecord
  /**
   * Maps user ids to nicknames
   */
  public users: { [userId: string]: string } = {}

  public history: types.GameHistoricalPoint[] = []

  constructor() {}

  public async initGame({ options, user, nickname }: InitGameOptions) {
    this.gameState = new GameState(options)
    this.gameState.initStonks()
    this.addUserPlayer({
      nickname,
      userId: user.id,
      isOwner: true,
    })
    await this.save()
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
    this.gameId = this.record.id
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

  public static async hydrateGame({
    gameId,
  }: {
    gameId: string
  }): Promise<GameManager> {
    const gameRepo = getRepository(GameRecord)
    const record = await gameRepo.findOne(gameId)

    if (!record) {
      throw new Error(`Could not find game with id ${gameId}`)
    }
    const gameManager = new GameManager()
    gameManager.record = record
    gameManager.gameState = GameState.fromJSON(record.game)
    gameManager.users = record.users
    return gameManager
  }
}
