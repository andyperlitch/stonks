import { createConnection } from 'typeorm'
import express, { Response as ExResponse } from 'express'
import expressSession from 'express-session'
import { readFileSync } from 'fs'
import bodyParser from 'body-parser'
import bearerToken from 'express-bearer-token'

import authRoutes from './routes/auth-routes'

export async function initApp() {
  // synchronize database
  const dbConnection = await createConnection()
  if (process.env.NODE_ENV !== 'production') {
    await dbConnection.synchronize()
  }

  const app = express()

  // create session
  app.use(expressSession())

  // parse bearer token
  app.use(bearerToken())

  // Use body parser to read sent json payloads
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  )
  app.use(bodyParser.json())

  // Get character data
  app.get('/avatar.json', (req, res) => {
    const avatarJson = readFileSync('./artwork/avatar.json', 'utf8')
    res.json(JSON.parse(avatarJson))
  })

  // Auth routes
  app.use('/auth', authRoutes)

  // Not found routes
  app.use(function notFoundHandler(_req, res: ExResponse) {
    res.status(404).send({
      message: 'Not Found',
    })
  })

  return app
}
