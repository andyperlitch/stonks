export interface GameConfig {
  marketHoursDuration: number
  afterHoursDuration: number
  numberOfDays: number
  maxPlayers: number
  defaultBuyingPower: number
  numberOfStonks: number
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
  roundEndTime: number
  config: GameConfig
  players: GamePlayers
  stonks: GameStonks
  owner: string
  history?: GameHistoricalPoint[]
}
