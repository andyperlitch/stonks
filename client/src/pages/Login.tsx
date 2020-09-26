import React from 'react'
import { ToolbarPage } from './ToolbarPage'
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react'
import { createUseStyles } from 'react-jss'
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
  },
  button: {
    maxWidth: '300px',
    width: '100%',
  },
})

export const Login = () => {
  const classes = useStyles()

  const googleLogin: () => any = () => {
    window.location.href = '/auth/google'
  }

  return (
    <ToolbarPage>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle className={classes.title}>Login</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className={classes.loginContent}>
          <GoogleLoginButton className={classes.button} onClick={googleLogin} />
        </IonCardContent>
      </IonCard>
    </ToolbarPage>
  )
}
