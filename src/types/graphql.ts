import { QueryResolvers as _QueryResolvers } from './graphql-types'
import { Request } from 'express'
import { User } from '../entity/User'

export interface GraphQLContext {
  /**
   * The original express request.
   */
  req: Request
  /**
   * The user object from passport.
   */
  user: User
}
export type QueryResolvers = _QueryResolvers<GraphQLContext>
