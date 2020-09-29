import { skip } from 'graphql-resolvers'
import { GraphQLContext } from './../../../types/graphql'

export const isAuthenticated = (_: any, __: any, { user }: GraphQLContext) =>
  user ? skip : new Error('User not authenticated')
