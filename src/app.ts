import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express'
import { readFileSync } from 'fs'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import { ValidateError } from 'tsoa'

import { RegisterRoutes } from '../build/routes'
import authRoutes from './routes/auth-routes'
export const app = express()

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

// Get character data

// Serve swagger docs
if (process.env.NODE_ENV !== 'production') {
  app.use(
    '/docs',
    swaggerUi.serve,
    async (_req: ExRequest, res: ExResponse) => {
      return res.send(
        swaggerUi.generateHTML(await import('../build/swagger.json')),
      )
    },
  )
}

app.get('/avatar.json', (req, res) => {
  const avatarJson = readFileSync('./artwork/avatar.json', 'utf8')
  res.json(JSON.parse(avatarJson))
})

// Auth routes
app.use('/auth', authRoutes)

// Register auto-generated routes from tsoa
RegisterRoutes(app)

// Not found routes
app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

// Error handler
app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction,
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
})
