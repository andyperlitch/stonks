import { Game, GameStatus } from '../../types/game'

const ENDED_STATES: GameStatus[] = ['COMPLETE', 'CANCELLED']

export const gameIsOver = (game: Game) => ENDED_STATES.includes(game.status)
