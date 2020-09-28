import { QueryResolvers as _QueryResolvers } from './graphql-types'
import { Request } from 'express'
import { IUser } from './passport'

export interface GraphQLContext {
  /**
   * The original express request.
   */
  req: Request
  /**
   * The user object from passport.
   */
  user: IUser
}
export type QueryResolvers = _QueryResolvers<GraphQLContext>
