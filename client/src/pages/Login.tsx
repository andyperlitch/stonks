import React from 'react'
import { ToolbarPage } from './ToolbarPage'
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react'
import { createUseStyles } from 'react-jss'
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom'

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
  return (
    <ToolbarPage>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle className={classes.title}>Login</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className={classes.loginContent}>
          <Link to="/auth/google">
            <GoogleButton />
          </Link>
        </IonCardContent>
      </IonCard>
    </ToolbarPage>
  )
}
