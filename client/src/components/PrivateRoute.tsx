import React from 'react'
import { Redirect, Route } from 'react-router'
import { useUserInfo } from '../auth/useUserInfo'

export const PrivateRoute = ({ children, ...rest }: any) => {
  const auth = useUserInfo()
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
