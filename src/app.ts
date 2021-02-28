import { getAppConfig } from './config'
import express from 'express'
import bodyParser from 'body-parser'
import expressSession from 'express-session'

import authRoutes from './routes/auth-routes'
import gameRoutes from './routes/game-routes'
import { setupAuth } from './setup-auth'
import { setupDB } from './setup-db'
import { setupGraphql } from './setup-graphql'
import { errorHandler } from './middleware/errorHandler'
import { setupGames } from './stores/game'

export async function initApp() {
  // set up database
  await setupDB()
  const config = getAppConfig()

  const app = express()

  app.use(
    expressSession({
      secret: config.session.cookieKey,
      saveUninitialized: true,
    }),
  )

  app.use((req, res, next) => {
    console.log('req.session', req.session)
    console.log('req.cookies', req.cookies)
    console.log('req.sessionID', req.sessionID)
    next()
  })

  // setup passport auth
  setupAuth(app)

  // rehydrate ongoing games
  await setupGames()

  // Use body parser to read sent json payloads
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  )
  app.use(bodyParser.json())

  // setup graphql server
  setupGraphql(app)

  // Auth routes
  app.use('/auth', authRoutes)

  // Game routes
  app.use('/api/games', gameRoutes)

  // Not found routes
  app.use(errorHandler)

  return app
}
