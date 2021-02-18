import { Router } from 'express'
import HttpError from '../errors/HttpError'
import asyncHandler from '../utils/asyncHandler'
import { User } from '../entity/User'
import { createGame, getGame } from '../stores/game'

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

router.post(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.user) {
      throw new HttpError(403, 'Unauthorized user trying to create game')
    }

    const options: NewGameBody = req.body

    if (!options.nickname) {
      throw new HttpError(400, `Username required`)
    }

    const gameManager = await createGame({ options, user: req.user })

    res.json({
      id: gameManager.gameId,
    })
  }),
)

router.post(
  '/join/:id',
  asyncHandler(async (req, res, next) => {
    const user = req.user as User
    if (!user || !req.session?.id) {
      throw new HttpError(403, 'Unauthorized user trying to join game')
    }

    const gameId = req.params.id
    const { nickname, code }: JoinGameBody = req.body

    const gameManager = await getGame({ id: gameId })
    if (!gameManager) {
      throw new HttpError(400, 'Game not found')
    }
    if (gameManager.hasUser(user.id)) {
      throw new HttpError(400, 'User is already in this game')
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
