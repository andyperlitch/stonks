import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useUserInfo } from '../auth/useUserInfo'
import { Loading } from '../pages/Loading'
import { routes } from '../routes'

export const PrivateRoute = ({ children, ...rest }: any) => {
  const auth = useUserInfo()
  return (
    <Route
      {...rest}
      render={
        (/* { location } */) => {
          if (auth.isAuthenticating) {
            return <Loading />
          }
          if (auth.isAuthenticated) {
            return children
          }
          return <Redirect to={routes.LOGIN} />
        }
      }
    />
  )
}
