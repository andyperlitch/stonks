import express, { Response as ExResponse } from 'express'
import { readFileSync } from 'fs'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth-routes'
import { setupAuth } from './setup-auth'
import { setupDB } from './setup-db'
import { setupGraphql } from './setup-graphql'

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
