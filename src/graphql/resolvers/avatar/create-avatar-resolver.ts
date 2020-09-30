import { MutationCreateAvatarArgs } from './../../../types/graphql-types'
import { Avatar } from './../../../entity/Avatar'
import { getRepository } from 'typeorm'
import { combineResolvers } from 'graphql-resolvers'
import { GraphQLContext } from './../../../types/graphql'
import { MutationResolvers } from '../../../types/graphql-types'
import { isAuthenticated } from '../common/is-authenticated'
import { generateName } from '../../../utils/generateName'
import { generateRandomAvatarComponents } from '../../../utils/generateRandomAvatarComponents'

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
    if (name) {
      newAvatar.name = name
    } else {
      newAvatar.name = generateName()
    }
    newAvatar.components = await generateRandomAvatarComponents()
    newAvatar.user = user
    return await avatarRepo.save(newAvatar)
  },
)
