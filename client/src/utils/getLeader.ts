import { Game } from '../../types/game'

export const getLeader = (game: Game) =>
  Object.keys(game.players).reduce((w, playerKey) => {
    if (game.players[playerKey].totalEquity > w.totalEquity) {
      return game.players[playerKey]
    }
    return w
  }, game.players[game.owner])
