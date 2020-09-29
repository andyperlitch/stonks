import { GraphQLError } from './../../errors/graphql-error'
import { MutationUpdateAvatarArgs } from './../../../types/graphql-types'
import { Avatar } from './../../../entity/Avatar'
import { getRepository } from 'typeorm'
import { combineResolvers } from 'graphql-resolvers'
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
    const avatarToUpdate = await avatarRepo.findOne(input.id)

    if (!avatarToUpdate) {
      throw new GraphQLError(
        'AVATAR_NOT_FOUND',
        'Could not find avatar to update',
      )
    }

    if (avatarToUpdate.user.id !== user.id) {
      throw new GraphQLError('AVATAR_NOT_OWNED', 'User does not own avatar')
    }

    if (input.name) {
      avatarToUpdate.name = input.name
    }

    if (input.components) {
      avatarToUpdate.components = input.components
    }

    return await avatarRepo.save(avatarToUpdate)
  },
)
