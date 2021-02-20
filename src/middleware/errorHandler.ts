import { ErrorRequestHandler } from 'express'
import HttpJsonError from '../errors/HttpJsonError'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`err instanceof HttpJsonError`, err instanceof HttpJsonError)
  if (err instanceof HttpJsonError) {
    res.status(err.status).json({
      status: err.status,
      code: err.code,
      message: err.message,
      more: err.more,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
    })
    return
  }
  res.status(err.status || 500).send(err.message)
}
