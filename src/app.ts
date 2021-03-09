import express from 'express'
import { sessionMiddleware } from './middleware/session'
import { staticMiddleware } from './middleware/staticMiddleware'
import { getAppConfig } from './config'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth-routes'
import gameRoutes from './routes/game-routes'
import { setupAuth } from './setup-auth'
import { setupDB } from './setup-db'
import { errorHandler } from './middleware/errorHandler'
import { setupGames } from './stores/game'

export async function initApp() {
  // set up database
  await setupDB()
  const config = getAppConfig()

  const app = express()

  app.use(sessionMiddleware(config))

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

  // Auth routes
  app.use('/auth', authRoutes)

  // Game routes
  app.use('/api/games', gameRoutes)

  // Static routes (for serving built UI)
  app.use(staticMiddleware({}))

  // Not found routes
  app.use(errorHandler)

  return app
}
