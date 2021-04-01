import { ErrorRequestHandler } from 'express'
import HttpJsonError from '../errors/HttpJsonError'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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

  res.status(500).json({
    status: 500,
    code: err.code ?? 'UNKNOWN',
    message: err.message,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
  })
}
