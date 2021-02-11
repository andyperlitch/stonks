import randomString from 'crypto-random-string'
import { EventEmitter } from 'events'
import * as types from '../types/game'
import { Stonk } from './Stonk'
import { Player } from './Player'

const DEFAULT_BUYING_POWER = 1000000
const MAX_PLAYER_COUNT = 50

export interface GameConfig {
  marketHoursDuration: number
  afterHoursDuration: number
  numberOfDays: number
  maxPlayers: number
}

export class Game extends EventEmitter {
  /**
   * The passcode for entering the game
   */
  public entryCode = randomString({ length: 4 }).toLowerCase()
  /**
   * The collection of players in this game
   */
  public players: { [playerName: string]: Player } = {}
  public stonks: { [ticker: string]: Stonk } = {}
  public status: types.GameStatus = 'NOT_STARTED'
  /**
   * Even rounds are open hours, odd are after hours.
   * -1 means the game has stopped, or has not started.
   */
  public round = -1
  private roundEndTime = Date.now()
  private roundTimeoutId: NodeJS.Timeout

  /**
   * Config options for the game
   */
  public config: GameConfig

  constructor(config?: Partial<GameConfig>) {
    super()
    this.config = {
      marketHoursDuration: 30000,
      afterHoursDuration: 60000,
      numberOfDays: 5,
      maxPlayers: Math.min(
        config?.maxPlayers || MAX_PLAYER_COUNT,
        MAX_PLAYER_COUNT,
      ),
      ...config,
    }
  }

  public get timeTilEndOfRound() {
    return this.roundEndTime - Date.now()
  }

  /**
   * Starts the game! We need to serialize the start and end dates for this
   */
  start() {
    this.nextRound()
  }

  nextRound() {
    if (this.round + 1 >= this.config.numberOfDays * 2) {
      this.stop('COMPLETE')
      return
    }

    this.round += 1
    const timeTilNextRound =
      this.round % 2 === 0
        ? this.config.marketHoursDuration
        : this.config.afterHoursDuration
    this.roundEndTime = Date.now() + timeTilNextRound
    this.roundTimeoutId = setTimeout(() => {
      this.nextRound()
    }, timeTilNextRound)
  }

  stop(status: 'CANCELLED' | 'COMPLETE') {
    if (this.roundTimeoutId) {
      clearTimeout(this.roundTimeoutId)
    }
    this.status = status
  }

  getPlayer(playerName: string) {
    return this.players[playerName]
  }

  addPlayer(playerName: string, buyingPower: number = DEFAULT_BUYING_POWER) {
    this.players[playerName] = new Player({
      name: playerName,
      buyingPower,
    })
  }

  getPlayerEquity(playerName: string): number {
    const player = this.players[playerName]
    let totalEquity = player.buyingPower
    for (const [ticker, { shares }] of Object.entries(player.portfolio)) {
      totalEquity += shares * this.stonks[ticker].price
    }
    return totalEquity
  }

  buy(playerName: string, ticker: string, shares = 1) {
    const player = this.players[playerName]
    const stonk = this.stonks[ticker]
    if (!player.canBuy(stonk, shares)) {
      return false
    }
    player.buy(stonk, shares)
    stonk.buy(shares)
    return true
  }

  sell(playerName: string, ticker: string, shares = 1) {
    const player = this.players[playerName]
    const stonk = this.stonks[ticker]
    if (!player.canSell(stonk, shares)) {
      return false
    }
    player.sell(stonk, shares)
    stonk.sell(shares)
    return true
  }

  toJSON(): types.Game {
    return {
      round: this.round,
      status: this.status,
      timeTilEndOfRound: this.timeTilEndOfRound,
      players: Object.keys(this.players).reduce(
        (acc, p) => ({
          ...acc,
          [this.players[p].name]: {
            ...this.players[p].toJSON(),
            totalEquity: this.getPlayerEquity(p),
          },
        }),
        {},
      ),
      stonks: Object.keys(this.stonks).reduce(
        (acc, s) => ({
          ...acc,
          [this.stonks[s].ticker]: this.stonks[s].toJSON(),
        }),
        {},
      ),
    }
  }
}
