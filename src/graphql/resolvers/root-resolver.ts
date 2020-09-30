import { avatarsResolver } from './avatar/avatars-resolver'
import { updateAvatarResolver } from './avatar/update-avatar-resolver'
import { createAvatarResolver } from './avatar/create-avatar-resolver'
import { GraphQLContext } from '../../types/graphql'
import { Resolvers } from '../../types/graphql-types'
import { meResolver } from './me-resolver'
import { avatarTemplateResolver } from './avatar/avatar-template-resolver'

export const resolvers: Resolvers<GraphQLContext> = {
  Query: {
    me: meResolver,
    avatarTemplate: avatarTemplateResolver,
    myAvatars: avatarsResolver,
  },
  Mutation: {
    createAvatar: createAvatarResolver,
    updateAvatar: updateAvatarResolver,
  },
}
