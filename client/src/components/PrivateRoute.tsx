import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../auth/AuthProvider'

export const PrivateRoute = ({ children, ...rest }: any) => {
  const auth = useAuth()
  console.log(`auth`, auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
