import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createContext } from './graphql/context'
import { resolvers } from './graphql/resolvers/root-resolver'
import { typeDefs } from './graphql/schema/root-schema'

export function setupGraphql(app: Express) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
  })
  apolloServer.applyMiddleware({ app })
}
