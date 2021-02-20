import GameManager from '../model/GameManager'
import { GameConfig } from '../types/game'

/**
 * A map of game ids to games
 */
const gamesById: Map<string, GameManager> = new Map()
const idsByCode: Map<string, string> = new Map()

export const createGame = async ({
  options: { nickname, ...options },
  user,
}: {
  options: Partial<GameConfig> & { nickname: string }
  user: any
}) => {
  const gameManager = new GameManager()
  await gameManager.initGame({ options, user, nickname })
  gamesById.set(gameManager.gameId, gameManager)
  idsByCode.set(gameManager.entryCode, gameManager.gameId)
  return gameManager
}

export const getGame = async ({ id }: { id: string }) => {
  if (gamesById.get(id)) {
    return gamesById.get(id)
  }
  // check if its not a game in memory
  try {
    const gameManager = await GameManager.hydrateGameById({ gameId: id })
    if (!gameManager.isCompleted()) {
      gamesById.set(gameManager.gameId, gameManager)
      idsByCode.set(gameManager.entryCode, gameManager.gameId)
    }
    return gameManager
  } catch (e) {
    return null
  }
}

export const getGameByCode = async ({ code }: { code: string }) => {
  if (idsByCode.has(code)) {
    return getGame({ id: idsByCode.get(code) as string })
  }
  // check if its not a game in memory
  try {
    const gameManager = await GameManager.hydrateGameByCode({ code })
    if (!gameManager.isCompleted()) {
      gamesById.set(gameManager.gameId, gameManager)
      idsByCode.set(gameManager.entryCode, gameManager.gameId)
    }
    return gameManager
  } catch (e) {
    return null
  }
}
