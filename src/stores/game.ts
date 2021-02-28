import { getRepository } from 'typeorm'
import { Socket, Server } from 'socket.io'
import cookieSession from 'cookie-session'
import { getAppConfig } from './../config'
import GameManager from '../model/GameManager'
import { GameConfig } from '../types/game'
import { Game as GameRecord } from '../entity/Game'

/**
 * A map of game ids to games
 */
const gamesById: Map<string, GameManager> = new Map()
const idsByCode: Map<string, string> = new Map()
const userIdToSocket = new Map<string, Socket>()
let io: Server

export const createGame = async ({
  options: { nickname, ...options },
  user,
}: {
  options: Partial<GameConfig> & { nickname: string }
  user: any
}) => {
  const gameManager = new GameManager()
  gameManager.userIdToSocket = userIdToSocket
  gameManager.io = io
  await gameManager.initGame({ options, user, nickname })
  registerGame(gameManager)

  return gameManager
}

const registerGame = (gameManager: GameManager) => {
  gameManager.userIdToSocket = userIdToSocket
  gameManager.io = io
  gamesById.set(gameManager.gameId, gameManager)
  idsByCode.set(gameManager.entryCode, gameManager.gameId)
}

export const getGame = async ({ id }: { id: string }) => {
  if (gamesById.get(id)) {
    return gamesById.get(id)
  }
  // check if its not a game in memory
  try {
    const gameManager = await GameManager.hydrateGameById({ gameId: id })
    if (!gameManager.isCompleted()) {
      registerGame(gameManager)
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
      registerGame(gameManager)
    }
    return gameManager
  } catch (e) {
    return null
  }
}

export const registerSocketServer = (_io: Server) => {
  io = _io
  for (const [, game] of gamesById) {
    game.io = io
  }
  io.on('connection', (socket: Socket) => {
    console.log('connection successful')
    registerSocket(socket)
  })
}

export const registerSocket = (socket: Socket) => {
  const config = getAppConfig()
  const request = socket.request as any
  // run the request through the cookie session middleware,
  // with a fake response and next function.
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey],
  })(request, {} as any, () => {
    // console.log(`socket.request`, Object.keys(request), request.session)
    const userId = request.session?.passport?.user
    userIdToSocket.set(userId, socket)

    console.log(`userId connected:`, userId, request.session, gamesById.size)

    // check games for a user's membership
    for (const [id, gameManager] of gamesById) {
      if (gameManager.hasUser(userId)) {
        console.log(`Game ${id} has user ${userId}. Connecting...`)
        gameManager.subscribeUserToGame(userId, socket)
      }
    }
  })
}

export const setupGames = async () => {
  const gameRepo = getRepository(GameRecord)
  const games = await gameRepo.find({
    where: {
      completed: false,
    },
  })
  games.forEach(async (game) => {
    const gameManager = await GameManager.hydrateGameById({
      gameId: game.id,
      record: game,
    })
    registerGame(gameManager)
  })
}
