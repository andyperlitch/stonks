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
   * Maps user ids to usernames
   */
  public users: Map<string, string> = new Map()

  public history: types.GameHistoricalPoint[] = []

  constructor() {}

  public async initGame({ options, user, nickname }: InitGameOptions) {
    this.gameState = new GameState(options)
    this.addUserPlayer({
      nickname,
      userId: user.id,
    })
    await this.save()
  }

  public async hydrateGame({ gameId }: { gameId: string }) {
    const gameRepo = getRepository(GameRecord)
    const record = await gameRepo.findOne(gameId)

    if (!record) {
      throw new Error(`Could not find game with id ${gameId}`)
    }
    this.record = record
    this.gameState = GameState.fromJSON(record.game)
  }

  public async save() {
    const gameRepo = getRepository(GameRecord)
    const game = gameRepo.create({
      id: this.gameId,
      code: this.entryCode,
      game: this.gameToJSON(),
    })
    this.record = await gameRepo.save(game)
    this.gameId = this.record.id
  }

  public gameToJSON(): types.Game {
    const state = this.gameState.toJSON()
    return {
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
    return this.users.has(userId)
  }

  public checkCode(code: string): boolean {
    return this.entryCode === code
  }

  public addUserPlayer({
    nickname,
    userId,
  }: {
    nickname: string
    userId: string
  }) {
    if (this.gameState.players[nickname]) {
      throw new Error(
        `Cannot add a player with the same nickname (${nickname})`,
      )
    }
    this.gameState.addPlayer(nickname)
    this.users.set(userId, nickname)
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
}
