import { Request } from 'express'
import { GraphQLContext } from '../types/graphql'
import { IUser } from '../types/passport'

export function createContext({ req }: { req: Request }): GraphQLContext {
  // couldn't get [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
  // to work with express so we have to be explicit here.
  const user = req.user as IUser
  return { req, user }
}
