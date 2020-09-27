import { GraphqlContext } from '../../types/graphql'
import { Resolvers } from '../../types/graphql-types'
import { meResolver } from './me-resolver'

export const resolvers: Resolvers<GraphqlContext> = {
  Query: {
    me: meResolver,
  },
}
