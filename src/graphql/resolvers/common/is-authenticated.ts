import { skip } from 'graphql-resolvers'
import { AuthenticationError } from 'apollo-server'
import { GraphQLContext } from './../../../types/graphql'

export const isAuthenticated = (_: any, __: any, { user }: GraphQLContext) =>
  user ? skip : new AuthenticationError('User not authenticated')
