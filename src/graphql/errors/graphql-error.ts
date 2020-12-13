import { ApolloError } from 'apollo-server'

const ErrorCodes = {
  AVATAR_NOT_OWNED: 'User does not own avatar',
  AVATAR_NOT_FOUND: 'Avatar not found',
  AVATAR_UPDATE_FAILED: 'Failed to update avatar',
  AVATAR_DELETE_FAILED: 'Failed to delete avatar',
}

type ErrorCode = keyof typeof ErrorCodes

export const createError = (
  code: ErrorCode,
  serverDetails?: { [key: string]: any },
  clientDetails?: { [key: string]: any },
) => {
  return new ApolloError(ErrorCodes[code], code, {
    serverDetails,
    clientDetails,
  })
}
