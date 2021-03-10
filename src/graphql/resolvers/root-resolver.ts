import { GraphQLContext } from '../../types/graphql'
import { Resolvers } from '../../types/graphql-types'
import { meResolver } from './me-resolver'

export const resolvers: Resolvers<GraphQLContext> = {
  Query: {
    me: meResolver,
  },
  Mutation: {},
}
