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
  return games.get(id)
}
