import React from 'react'

import { createUseStyles } from 'react-jss'
import { useLocation } from 'react-router'
import { GoogleLoginButton } from 'react-social-login-buttons'

const useStyles = createUseStyles({
  title: {
    textAlign: 'center',
  },
  loginContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    maxWidth: '300px',
    width: '100%',
  },
})

export const Login = () => {
  const classes = useStyles()
  const location = useLocation()

  const googleLogin: () => any = () => {
    window.location.href = `/auth/google${location.search}`
  }

  return (
    <div className={classes.loginContent}>
      <h1>Please log in!</h1>
      <GoogleLoginButton className={classes.button} onClick={googleLogin} />
    </div>
  )
}
