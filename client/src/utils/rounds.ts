import * as types from '../../types/game'
export const getDayForRound = (
  game: types.Game,
): [types.Round, types.Round] => {
  if (game.round === -1) {
    return [game.rounds[0], game.rounds[1]]
  }
  if (game.round % 2 === 0) {
    return [game.rounds[game.round], game.rounds[game.round + 1]]
  }
  return [game.rounds[game.round - 1], game.rounds[game.round]]
}
