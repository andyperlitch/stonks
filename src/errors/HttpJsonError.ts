import { ErrorCode } from '../consts/errorCodes'
export { ErrorCode } from '../consts/errorCodes'

const CODE_MESSAGES: {
  [key in ErrorCode]?: string | ((more: any) => string)
} = {
  [ErrorCode.UNAUTHORIZED]: 'Unauthorized user',
  [ErrorCode.INVALID_FIELD]: (more) => `Invalid field (${more.field})`,
  [ErrorCode.GAME_NOT_FOUND]: (more) => `Game not found (${more.gameId})`,
  [ErrorCode.USER_NOT_IN_GAME]: (more) =>
    `User (${more.userId}) not in game (${more.gameId})`,
  [ErrorCode.USER_ALREADY_IN_GAME]: 'User already in game',
  [ErrorCode.INVALID_GAME_CODE]: 'Game code given is not a known one',
}

export default class HttpJsonError<T = any> extends Error {
  constructor(public status: number, public code: ErrorCode, public more?: T) {
    super(
      typeof CODE_MESSAGES[code] === 'string'
        ? CODE_MESSAGES[code]
        : typeof CODE_MESSAGES[code] === 'function'
        ? (CODE_MESSAGES[code] as any)(more)
        : code,
    )
  }
}
