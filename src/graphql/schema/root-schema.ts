import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    """
    Info about the current user, logged in or not.
    """
    me: User!
  }

  type User {
    isAuthenticated: Boolean!
    id: ID
    email: String
    username: String
    googleId: String
    thumbnail: String
  }
`
