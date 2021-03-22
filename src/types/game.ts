export interface GameConfig {
  /** in milliseconds */
  marketHoursDuration: number
  /** in milliseconds */
  afterHoursDuration: number
  numberOfDays: number
  maxPlayers: number
  defaultBuyingPower: number
  numberOfStonks: number
}

export interface Round {
  id: number
  day: number
  startTime: number
  endTime: number
}

export interface PortfolioItem {
  shares: number
  ticker: string
}
export type PlayerPortfolio = {
  [ticker: string]: PortfolioItem
}
export interface Player {
  name: string
  portfolio: PlayerPortfolio
  buyingPower: number
  totalEquity: number
}
export interface PlayerHistoryPoint {
  portfolio: PlayerPortfolio
  buyingPower: number
  totalEquity: number
}
export interface Stonk {
  ticker: string
  price: number
  outstanding: number
  volatility: StonkVolatility
  /**
   * How often the stock is going up in the market (non-player movement)
   */
  bullPercent: number
  /**
   * If contains items, these will be used to change the state of the stonk at
   * a later time.
   */
  changeQueue: QueuedStonkChange[]
}

export interface StonkVolatility {
  /**
   * Average percent jump the stock price makes when there is a buy
   */
  up: number
  /**
   * Average percent jump the stock price makes when there is a sell
   */
  down: number
}

/**
 * A queued-up object that will change the bullPercent or volatility of this stonk
 * after `startTime`. Note that the values are DELTAS, since the values themselves
 * might change from other forces
 */
export interface QueuedStonkChange {
  volatility?: Partial<StonkVolatility>
  bullPercent?: number
  /**
   * The timestamp after which this stonk change should take effect
   */
  startTime: number
}

export interface StonkHistoryPoint {
  price: number
  outstanding: number
}

export type GamePlayers = { [name: string]: Player }
export type GameStonks = { [ticker: string]: Stonk }
export type GameStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETE'
  | 'CANCELLED'
export interface GameState {
  round: number
  rounds: Round[]
  config: GameConfig
  roundEndTime: number
  status: GameStatus
  players: GamePlayers
  stonks: GameStonks
  owner: string
}

export interface GameHistoricalPoint {
  ts: number
  players: PlayersHistoryPoint
  stonks: StonksHistoryPoint
  round: number
}

export type PlayersHistoryPoint = { [name: string]: PlayerHistoryPoint }
export type StonksHistoryPoint = { [ticker: string]: StonkHistoryPoint }
export interface Game {
  id: string
  status: GameStatus
  /**
   * Even rounds are open hours, odd are after hours.
   * -1 means the game has stopped, or has not started.
   */
  round: number
  rounds: Round[]
  /** timestamp (ms) */
  roundEndTime: number
  config: GameConfig
  players: GamePlayers
  stonks: GameStonks
  owner: string
  history?: GameHistoricalPoint[]
}
