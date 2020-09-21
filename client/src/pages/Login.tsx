import React from 'react'
import { ToolbarPage } from './ToolbarPage'
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login'

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
})

export const Login = () => {
  const classes = useStyles()

  const onGoogleSuccess = (gr: GoogleLoginResponse) => {
    fetch('/auth/verify', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${gr.tokenId}`,
      },
    })
  }

  return (
    <ToolbarPage>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle className={classes.title}>Login</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className={classes.loginContent}>
          <GoogleLogin
            clientId="991021471135-t2j25if3lpp8ji5691ufqje5ogt3l3ok.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={onGoogleSuccess as any}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </IonCardContent>
      </IonCard>
    </ToolbarPage>
  )
}
