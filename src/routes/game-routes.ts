import { Router } from 'express'
import HttpJsonError, { ErrorCode } from '../errors/HttpJsonError'
import asyncHandler from '../utils/asyncHandler'
import { User } from '../entity/User'
import { createGame, getGame, getGameByCode } from '../stores/game'
import { protectedRoute } from '../middleware/protectedRoute'

const router = Router()
interface NewGameBody {
  maxPlayers: number
  numberOfDays: number
  numberOfStonks: number
  nickname: string
}

interface JoinGameBody {
  nickname: string
  code: string
}

/**
 * Create a new game
 */
router.post(
  '/',
  protectedRoute(),
  asyncHandler(async (req, res) => {
    const options: NewGameBody = req.body

    if (!options.nickname) {
      throw new HttpJsonError(400, ErrorCode.INVALID_FIELD, {
        field: 'nickname',
      })
    }

    const gameManager = await createGame({ options, user: req.user })

    res.json({
      id: gameManager.gameId,
    })
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const gameId = req.params.id
    const user = req.user as User
    const userId = user?.id || req.sessionID

    if (!userId) {
      throw new HttpJsonError(400, ErrorCode.SESSION_ID_NOT_SET)
    }

    const gameManager = await getGame({ id: gameId })
    if (!gameManager) {
      throw new HttpJsonError(404, ErrorCode.GAME_NOT_FOUND, {
        gameId,
      })
    }
    if (!gameManager.hasUser(userId)) {
      throw new HttpJsonError(403, ErrorCode.USER_NOT_IN_GAME, {
        gameId,
        userId,
      })
    }
    const game = gameManager.gameToJSON()
    res.json({
      game,
      nickname: gameManager.users[userId],
      code:
        gameManager.users[userId] === game.owner
          ? gameManager.entryCode
          : undefined,
    })
  }),
)

router.post(
  '/join',
  asyncHandler(async (req, res, next) => {
    const { nickname, code }: JoinGameBody = req.body
    const user = req.user as User
    let userId: string = user?.id || req.sessionID || ''

    if (userId === '') {
      throw new HttpJsonError(500, ErrorCode.SESSION_ID_NOT_SET)
    }

    const gameManager = await getGameByCode({ code })
    if (!gameManager) {
      throw new HttpJsonError(400, ErrorCode.INVALID_GAME_CODE, { code })
    }
    if (gameManager.hasUser(userId)) {
      throw new HttpJsonError(400, ErrorCode.USER_ALREADY_IN_GAME)
    }
    if (gameManager.gameState.status !== 'NOT_STARTED') {
      throw new HttpJsonError(400, ErrorCode.GAME_ALREADY_STARTED)
    }
    gameManager.addUserPlayer({ nickname, userId })
    await gameManager.save()
    res.json({
      id: gameManager.gameId,
    })
  }),
)

router.post(
  '/:id/start',
  protectedRoute(),
  asyncHandler(async (req, res, next) => {
    // get the game data
    const gameManager = await getGame({ id: req.params.id })
    // check if game exists
    if (!gameManager) {
      throw new HttpJsonError(404, ErrorCode.GAME_NOT_FOUND)
    }

    // check that this user owns the game
    const user = req.user as User
    if (!gameManager.isOwner(user?.id)) {
      throw new HttpJsonError(403, ErrorCode.USER_NOT_OWNER)
    }

    // check if the game has started already
    if (gameManager.gameState.status !== 'NOT_STARTED') {
      throw new HttpJsonError(400, ErrorCode.GAME_ALREADY_STARTED)
    }

    // start the game
    gameManager.start()

    res.json({
      game: gameManager.gameToJSON(),
    })
  }),
)

export default router
