import express from 'express'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth-routes'
import gameRoutes from './routes/game-routes'
import { setupAuth } from './setup-auth'
import { setupDB } from './setup-db'
import { setupGraphql } from './setup-graphql'
import { errorHandler } from './middleware/errorHandler'

export async function initApp() {
  // set up database
  await setupDB()

  const app = express()

  // setup passport auth
  setupAuth(app)

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
  app.use('/api/games', gameRoutes)

  // Not found routes
  app.use(errorHandler)

  return app
}
