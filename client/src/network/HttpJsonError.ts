import { ErrorCode } from '../consts/errorCodes'

export default class HttpJsonError<T = any> extends Error {
  constructor(
    public status: number,
    public code: ErrorCode,
    message: string,
    public more?: T,
  ) {
    super(message)
  }
}
