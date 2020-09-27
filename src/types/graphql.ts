import { QueryResolvers as _QueryResolvers } from './graphql-types'
import { Request } from 'express'
import { IUser } from './passport'

export interface GraphqlContext {
  req: Request
  user: IUser
}
export type QueryResolvers = _QueryResolvers<GraphqlContext>
export type MeResolver = QueryResolvers['me']
