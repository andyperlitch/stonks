import { ApolloServer, gql } from 'apollo-server-express'
import { createContext } from 'vm'

const typeDefs = gql`
  type User {
    id: Int
    email: String
    isAuthenticated: Boolean!
  }
  type Query {
    user: User
  }
`

const resolvers = {
  // User: userResolver,
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
})
