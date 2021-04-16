import { Router } from 'express'
import HttpJsonError, { ErrorCode } from '../errors/HttpJsonError'
import asyncHandler from '../utils/asyncHandler'
import { User } from '../entity/User'
import { createGame, getGame, getGameByCode } from '../stores/game'
import { protectedRoute } from '../middleware/protectedRoute'
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from '../consts/validation'

const router = Router()

interface PlayerFields {
  nickname: string
  playerColor: string
  playerAvatar: string
}

interface NewGameBody extends PlayerFields {
  maxPlayers: number
  numberOfDays: number
  numberOfStonks: number
}
interface JoinGameBody extends PlayerFields {
  code: string
}

const REQUIRED_PLAYER_FIELDS: (keyof PlayerFields)[] = [
  'nickname',
  'playerColor',
  'playerAvatar',
]

/**
 * Create a new game
 */
router.post(
  '/',
  protectedRoute(),
  asyncHandler(async (req, res) => {
    const options: NewGameBody = req.body
    REQUIRED_PLAYER_FIELDS.forEach((field) => {
      if (!options[field]) {
        throw new HttpJsonError(400, ErrorCode.INVALID_FIELD, {
          field,
        })
      }
    })

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
    const history = gameManager.getGameHistory()
    res.json({
      game,
      history,
      nickname: gameManager.users[userId],
      code: gameManager.entryCode,
    })
  }),
)

router.post(
  '/join',
  asyncHandler(async (req, res, next) => {
    const {
      nickname,
      playerColor,
      playerAvatar,
      code: _code,
    }: JoinGameBody = req.body
    const code = _code.toUpperCase()
    const user = req.user as User
    let userId: string = user?.id || req.sessionID || ''

    if (userId === '') {
      throw new HttpJsonError(500, ErrorCode.SESSION_ID_NOT_SET)
    }

    REQUIRED_PLAYER_FIELDS.forEach((field) => {
      if (!req.body[field]) {
        throw new HttpJsonError(400, ErrorCode.INVALID_FIELD, {
          field,
        })
      }
    })

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
    if (
      nickname.length > MAX_NAME_LENGTH ||
      nickname.length < MIN_NAME_LENGTH
    ) {
      throw new HttpJsonError(400, ErrorCode.USER_NAME_INVALID)
    }
    gameManager.addUserPlayer({
      nickname,
      userId,
      color: playerColor,
      avatar: playerAvatar,
    })
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
    // extract gameId from params
    const gameId = req.params.id
    // get the game data
    const gameManager = await getGame({ id: gameId })
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

router.post(
  '/:id/cancel',
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

    // check that the game is still going
    if (gameManager.isCompleted()) {
      throw new HttpJsonError(400, ErrorCode.GAME_ALREADY_OVER)
    }

    // stop the game
    await gameManager.cancel()

    res.json({
      game: gameManager.gameToJSON(),
    })
  }),
)

export default router
