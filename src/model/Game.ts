import * as types from '../types/game'
import { Stonk } from './Stonk'
import { Player } from './Player'
import { generateStonk } from '../utils/generateStonk'
import { generateRounds } from '../utils/generateRounds'

const MAX_PLAYER_COUNT = 50
const DEFAULT_BUYING_POWER = 10000
const DEFAULT_MARKET_HOURS_DURATION = 30000
const MAX_MARKET_HOURS_DURATION = 30000 * 60
const DEFAULT_AFTER_HOURS_DURATION = 20000
const MAX_AFTER_HOURS_DURATION = 60000 * 60
const DEFAULT_NUMBER_OF_DAYS = 5
const MAX_NUMBER_OF_DAYS = 15
const DEFAULT_NUMBER_OF_STONKS = 6
const MAX_NUMBER_OF_STONKS = 8

type Players = { [playerName: string]: Player }
type Stonks = { [ticker: string]: Stonk }

export class Game {
  /**
   * The collection of players in this game
   */
  public players: Players = {}
  public owner: Player
  public stonks: Stonks = {}
  public status: types.GameStatus = 'NOT_STARTED'
  /**
   * Even rounds are open hours, odd are after hours.
   * -1 means the game has stopped, or has not started.
   */
  public round = -1
  public roundEndTime: number
  public rounds: types.Round[] = []

  /**
   * Config options for the game
   */
  public config: types.GameConfig

  constructor(config?: Partial<types.GameConfig>) {
    this.config = {
      marketHoursDuration: Math.min(
        config?.marketHoursDuration || DEFAULT_MARKET_HOURS_DURATION,
        MAX_MARKET_HOURS_DURATION,
      ),
      afterHoursDuration: Math.min(
        config?.afterHoursDuration || DEFAULT_AFTER_HOURS_DURATION,
        MAX_AFTER_HOURS_DURATION,
      ),
      defaultBuyingPower: DEFAULT_BUYING_POWER,
      numberOfDays: Math.min(
        config?.numberOfDays || DEFAULT_NUMBER_OF_DAYS,
        MAX_NUMBER_OF_DAYS,
      ),
      numberOfStonks: Math.min(
        config?.numberOfStonks || DEFAULT_NUMBER_OF_STONKS,
        MAX_NUMBER_OF_STONKS,
      ),
      maxPlayers: Math.min(
        config?.maxPlayers || MAX_PLAYER_COUNT,
        MAX_PLAYER_COUNT,
      ),
      ...config,
    }
  }

  initStonks() {
    let { numberOfStonks } = this.config

    while (numberOfStonks > 0) {
      const stonk = generateStonk()
      if (this.stonks[stonk.ticker]) {
        continue
      }
      this.stonks[stonk.ticker] = stonk
      --numberOfStonks
    }
  }

  /**
   * Starts the game! We need to serialize the start and end dates for this
   */
  start() {
    this.status = 'IN_PROGRESS'
    this.rounds = generateRounds(this.config, Date.now())
    this.nextRound()
  }

  /**
   * Proceeds to the next round. Returns epoch of when the new round will end.
   */
  nextRound() {
    if (this.round + 1 >= this.config.numberOfDays * 2) {
      this.stop('COMPLETE')
      return
    }

    this.round += 1
    this.roundEndTime = this.rounds[this.round].endTime
  }

  /**
   * Stops the game, either by the owner cancelling or it completing all rounds
   */
  stop(status: 'CANCELLED' | 'COMPLETE') {
    this.status = status
    this.round = -1
  }

  getPlayer(playerName: string) {
    return this.players[playerName]
  }

  addPlayer(playerName: string, isOwner = false) {
    this.players[playerName] = new Player({
      name: playerName,
      buyingPower: this.config.defaultBuyingPower,
    })
    if (isOwner) {
      this.owner = this.players[playerName]
    }
    return this.players[playerName]
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
    stonk.buy(shares, true)
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

  toJSON(): types.GameState {
    return {
      owner: this.owner?.name || '',
      round: this.round,
      rounds: this.rounds,
      roundEndTime: this.roundEndTime,
      status: this.status,
      config: this.config,
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

  static fromJSON(gameJson: types.GameState): Game {
    const game = new Game(gameJson.config)

    game.stonks = Object.values(gameJson.stonks).reduce((acc, s) => {
      acc[s.ticker] = Stonk.fromJSON(s)
      return acc
    }, {} as Stonks)

    game.players = Object.values(gameJson.players).reduce((acc, p) => {
      acc[p.name] = new Player(p)
      return acc
    }, {} as Players)

    const { round, roundEndTime, status, owner, rounds } = gameJson
    game.round = round
    game.roundEndTime = roundEndTime
    game.status = status
    game.owner = game.players[owner]
    game.rounds = rounds

    return game
  }
}
