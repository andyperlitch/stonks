import { IonButton } from '@ionic/react'
import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  title: {
    fontSize: '64px',
  },
  titleText: {
    marginLeft: '0.5em',
    marginRight: '0.5em',
  },
  container: {
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    '& strong': {
      fontSize: '20px',
      lineHeight: '26px',
    },
    '& p': {
      fontSize: '16px',
      lineHeight: '22px',
      color: '#8c8c8c',
      margin: 0,
    },
    '& a': {
      textDecoration: 'none',
    },
  },
  buttons: {
    marginTop: '2rem',
  },
  ctaButton: {
    minWidth: '200px',
  },
})

interface ContainerProps {}

const rocket = (
  <span role="img" aria-label="rocket">
    🚀
  </span>
)

const StartComponent = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        <span role="img" aria-label="diamond">
          💎
        </span>
        <span className={classes.titleText}>STONKS</span>
        <span role="img" aria-label="hands">
          🙌
        </span>
      </h1>
      <strong>
        Choose the right stonks and watch them {rocket}
        {rocket}
        {rocket}
        {rocket}
        {rocket}
        {rocket}
        .<br />
        Just don't get caught being a bagholder!
      </strong>
      <div className={classes.buttons}>
        <IonButton
          className={classes.ctaButton}
          fill="solid"
          size="large"
          href="/new-game"
        >
          Create Game
        </IonButton>
        <IonButton className={classes.ctaButton} fill="outline" size="large">
          Join Game
        </IonButton>
      </div>
    </div>
  )
}

export default StartComponent
