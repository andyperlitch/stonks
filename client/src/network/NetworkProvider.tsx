import React from 'react'
import ApolloClient from 'apollo-boost'
import { ReactNode } from 'react'
import { ApolloProvider } from 'react-apollo'

/**
 * Sets up Apollo provider/client
 */
export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const client = new ApolloClient({ uri: '/graphql' })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
