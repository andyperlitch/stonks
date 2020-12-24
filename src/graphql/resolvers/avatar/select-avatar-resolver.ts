import { combineResolvers } from 'graphql-resolvers'
import { createError } from './../../errors/graphql-error'
import { MutationUpdateAvatarArgs } from './../../../types/graphql-types'
import { Avatar, User } from './../../../entity'
import { getRepository } from 'typeorm'
import { GraphQLContext } from './../../../types/graphql'
import { MutationResolvers } from '../../../types/graphql-types'
import { isAuthenticated } from '../common/is-authenticated'
import { fromUser } from '../common/db-to-gql'

export const selectAvatarResolver: MutationResolvers<
  GraphQLContext
>['selectAvatar'] = combineResolvers<
  any,
  GraphQLContext,
  MutationUpdateAvatarArgs
>(isAuthenticated, async (root, { input }, { user }) => {
  const avatarRepo = getRepository(Avatar)
  const userRepo = getRepository(User)
  const avatarToSelect = await avatarRepo.findOne(input.id, {
    relations: ['user'],
  })

  if (!avatarToSelect) {
    throw createError('AVATAR_NOT_FOUND')
  }

  if (avatarToSelect.user.id !== user.id) {
    throw createError('AVATAR_NOT_OWNED')
  }

  user.currentAvatar = avatarToSelect.id

  try {
    await userRepo.save(user)
  } catch (error) {
    throw createError('AVATAR_SELECT_FAILED', { error })
  }

  return fromUser(user)
})
