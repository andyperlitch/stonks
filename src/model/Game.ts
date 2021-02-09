import randomString from 'crypto-random-string'
import { EventEmitter } from 'events'
import * as types from '../types/game'

const DEFAULT_BUYING_POWER = 1000000
const MAX_PLAYER_COUNT = 50

export class Player {
  public name: string
  public portfolio: types.PlayerPortfolio = {}
  public buyingPower: number = 0 // in cents

  public canBuy(stonk: Stonk, shares: number) {
    return shares * stonk.price < this.buyingPower
  }
  public buy(stonk: Stonk, shares: number = 1) {
    this.buyingPower -= shares * stonk.price
    this.portfolio[stonk.ticker] = {
      ticker: stonk.ticker,
      shares: (this.portfolio[stonk.ticker]?.shares || 0) + shares,
    }
  }
  public canSell(stonk: Stonk, shares: number) {
    return (this.portfolio[stonk.ticker]?.shares || 0) >= shares
  }
  public sell(stonk: Stonk, shares: number = 1) {
    this.buyingPower += shares * stonk.price
    this.portfolio[stonk.ticker] = {
      ticker: stonk.ticker,
      shares: (this.portfolio[stonk.ticker]?.shares || 0) - shares,
    }
  }
  public toJSON(): Pick<types.Player, 'name' | 'portfolio' | 'buyingPower'> {
    return {
      name: this.name,
      portfolio: this.portfolio,
      buyingPower: this.buyingPower,
    }
  }
  constructor({ name, buyingPower }: { name: string; buyingPower: number }) {
    this.name = name
    this.buyingPower = buyingPower
  }
}

export class Stonk {
  /**
   * How much the stock price changes each time a single stock is bought or sold
   */
  public volatility = 0.08

  /**
   * Number of shares outstanding
   */
  public outstanding = 1000

  /**
   * The share price, in cents
   */
  public price = 100

  public get marketCap() {
    return this.outstanding * this.price
  }

  /**
   * Changes the price based on a buy event
   */
  public buy(quantity: number) {
    this.price = this.price + this.volatility * quantity
  }

  /**
   * Changes the price based on a sell event
   */
  public sell(quantity: number) {
    this.price = this.price - this.volatility * quantity
  }

  public toJSON(): types.Stonk {
    return {
      price: this.price,
      outstanding: this.outstanding,
    }
  }

  constructor(public ticker: string) {}
}

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
