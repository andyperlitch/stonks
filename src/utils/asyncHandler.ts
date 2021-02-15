import { Request, Response, NextFunction, Handler } from 'express'

const asyncHandler = (handler: Handler) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return handler(req, res, next)
  } catch (e) {
    next(e)
  }
}
export default asyncHandler
