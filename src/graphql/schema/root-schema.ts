import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type User {
    isAuthenticated: Boolean!
    id: String
    email: String
    username: String
    googleId: String
    thumbnail: String
  }
  type Query {
    me: User
  }
`
