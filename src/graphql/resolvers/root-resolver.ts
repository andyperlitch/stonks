import { GraphQLContext } from '../../types/graphql'
import { Resolvers } from '../../types/graphql-types'
import { meResolver } from './me-resolver'
import { avatarTemplateResolver } from './avatar-template-resolver'

export const resolvers: Resolvers<GraphQLContext> = {
  Query: {
    me: meResolver,
    avatarTemplate: avatarTemplateResolver,
  },
}
