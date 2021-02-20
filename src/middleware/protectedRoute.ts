import { Handler } from 'express'
import HttpJsonError, { ErrorCode } from '../errors/HttpJsonError'
export const protectedRoute = (): Handler => (req, res, next) => {
  const user = req.user
  if (!user) {
    return next(new HttpJsonError(403, ErrorCode.UNAUTHORIZED))
  }
  next()
}
