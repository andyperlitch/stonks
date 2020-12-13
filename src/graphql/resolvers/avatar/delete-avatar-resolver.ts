import { getRepository } from 'typeorm'
import { combineResolvers } from 'graphql-resolvers'
import { createError } from './../../errors/graphql-error'
import { GraphQLContext } from '../../../types/graphql'
import { Avatar } from './../../../entity/Avatar'
import {
  MutationResolvers,
  MutationDeleteAvatarArgs,
} from '../../../types/graphql-types'
import { isAuthenticated } from '../common/is-authenticated'

export const deleteAvatarResolver: MutationResolvers<
  GraphQLContext
>['deleteAvatar'] = combineResolvers<
  any,
  GraphQLContext,
  MutationDeleteAvatarArgs
>(
  isAuthenticated,
  async (_root, { input }, { user }): Promise<Avatar> => {
    const { id } = input
    const avatarRepo = getRepository(Avatar)
    const avatarToDelete = await avatarRepo.findOne(id, { relations: ['user'] })

    if (!avatarToDelete) {
      throw createError('AVATAR_NOT_FOUND')
    }

    const avatarUser = await avatarToDelete.user

    if (avatarUser.id !== user.id) {
      throw createError('AVATAR_NOT_OWNED')
    }

    try {
      await avatarRepo.delete(avatarToDelete.id)
      return avatarToDelete
    } catch (error) {
      throw createError('AVATAR_DELETE_FAILED', { error, avatarToDelete })
    }
  },
)
