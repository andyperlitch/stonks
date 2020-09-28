import { GraphqlContext } from '../../types/graphql'
import { Resolvers } from '../../types/graphql-types'
import { meResolver } from './me-resolver'
import { avatarTemplateResolver } from './avatar-template-resolver'

export const resolvers: Resolvers<GraphqlContext> = {
  Query: {
    me: meResolver,
    avatarTemplate: avatarTemplateResolver,
  },
}
