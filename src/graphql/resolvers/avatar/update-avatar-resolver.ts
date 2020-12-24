import { combineResolvers } from 'graphql-resolvers'
import { createError } from './../../errors/graphql-error'
import { MutationUpdateAvatarArgs } from './../../../types/graphql-types'
import { Avatar } from './../../../entity/Avatar'
import { getRepository } from 'typeorm'
import { GraphQLContext } from './../../../types/graphql'
import { MutationResolvers } from '../../../types/graphql-types'
import { isAuthenticated } from '../common/is-authenticated'

export const updateAvatarResolver: MutationResolvers<
  GraphQLContext
>['updateAvatar'] = combineResolvers<
  any,
  GraphQLContext,
  MutationUpdateAvatarArgs
>(
  isAuthenticated,
  async (root, { input }, { user }): Promise<Avatar> => {
    const avatarRepo = getRepository(Avatar)
    const avatarToUpdate = await avatarRepo.findOne(input.id, {
      relations: ['user'],
    })

    if (!avatarToUpdate) {
      throw createError('AVATAR_NOT_FOUND')
    }

    if (avatarToUpdate.user.id !== user.id) {
      throw createError('AVATAR_NOT_OWNED')
    }

    if (input.name) {
      avatarToUpdate.name = input.name
    }

    if (input.components) {
      avatarToUpdate.components = input.components
    }

    try {
      return await avatarRepo.save(avatarToUpdate)
    } catch (error) {
      throw createError('AVATAR_UPDATE_FAILED', { error })
    }
  },
)
