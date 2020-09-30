import React from 'react'
import { Redirect, Route } from 'react-router'
import { useUserInfo } from '../auth/useUserInfo'
import { Loading } from '../pages/Loading'

export const PrivateRoute = ({ children, ...rest }: any) => {
  const auth = useUserInfo()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (auth.isAuthenticating) {
          return <Loading />
        }
        if (auth.isAuthenticated) {
          return children(rest)
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}
