import { Router } from 'express'
import HttpJsonError, { ErrorCode } from '../errors/HttpJsonError'
import asyncHandler from '../utils/asyncHandler'
import { User } from '../entity/User'
import { createGame, getGame } from '../stores/game'
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
  asyncHandler(async (req, res) => {
    if (!req.user) {
      throw new HttpJsonError(403, ErrorCode.UNAUTHORIZED)
    }

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
  protectedRoute(),
  asyncHandler(async (req, res, next) => {
    const gameId = req.params.id
    const user = req.user as User
    const gameManager = await getGame({ id: gameId })
    if (!gameManager) {
      throw new HttpJsonError(404, ErrorCode.GAME_NOT_FOUND, {
        gameId,
      })
    }
    if (!gameManager.hasUser(user.id)) {
      throw new HttpJsonError(403, ErrorCode.USER_NOT_IN_GAME, {
        gameId,
        userId: user.id,
      })
    }
    res.json({
      game: gameManager.gameToJSON(),
      nickname: gameManager.users[user.id],
    })
  }),
)

router.post(
  '/:id/join',
  protectedRoute(),
  asyncHandler(async (req, res, next) => {
    const gameId = req.params.id
    const { nickname, code }: JoinGameBody = req.body
    const user = req.user as User

    const gameManager = await getGame({ id: gameId })
    if (!gameManager) {
      throw new HttpJsonError(400, ErrorCode.GAME_NOT_FOUND, { gameId })
    }
    if (gameManager.hasUser(user.id)) {
      throw new HttpJsonError(400, ErrorCode.USER_ALREADY_IN_GAME)
    }
    if (gameManager.checkCode(code)) {
      await gameManager.addUserPlayer({ nickname, userId: user.id })
    }
    res.json({
      game: gameManager.gameToJSON(),
    })
  }),
)

export default router
