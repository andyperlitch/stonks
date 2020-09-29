import { MutationCreateAvatarArgs } from './../../../types/graphql-types'
import { Avatar } from './../../../entity/Avatar'
import { getRepository } from 'typeorm'
import { combineResolvers } from 'graphql-resolvers'
import { GraphQLContext } from './../../../types/graphql'
import { MutationResolvers } from '../../../types/graphql-types'
import { isAuthenticated } from '../common/is-authenticated'

export const createAvatarResolver: MutationResolvers<
  GraphQLContext
>['createAvatar'] = combineResolvers<
  any,
  GraphQLContext,
  MutationCreateAvatarArgs
>(
  isAuthenticated,
  async (root, { input: { name } }, { user }): Promise<Avatar> => {
    const avatarRepo = getRepository(Avatar)
    const newAvatar = new Avatar()
    newAvatar.name = name
    newAvatar.user = user
    return await avatarRepo.save(newAvatar)
  },
)
