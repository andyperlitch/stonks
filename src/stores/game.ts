import GameManager from '../model/GameManager'
import { GameConfig } from '../types/game'

const games: Map<string, GameManager> = new Map<string, GameManager>()

export const createGame = async ({
  options: { nickname, ...options },
  user,
}: {
  options: Partial<GameConfig> & { nickname: string }
  user: any
}) => {
  const gameManager = new GameManager()
  await gameManager.initGame({ options, user, nickname })
  games.set(gameManager.gameId, gameManager)
  return gameManager
}

export const getGame = async ({ id }: { id: string }) => {
  if (games.get(id)) {
    return games.get(id)
  }
  // check if its not a game in memory
  try {
    return await GameManager.hydrateGame({ gameId: id })
  } catch (e) {
    return null
  }
}
