import { Request } from 'express'
import { GraphqlContext } from '../types/graphql'

export function createContext({ req }: { req: Request }): GraphqlContext {
  return { req }
}
