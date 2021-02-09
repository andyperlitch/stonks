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
export interface Stonk {
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
export interface Game {
  round: number
  timeTilEndOfRound: number
  status: GameStatus
  players: GamePlayers
  stonks: GameStonks
}
