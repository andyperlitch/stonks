import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      paddingTop: '20px',
    },
    rocket: {
      animation: '$shake 0.2s infinite',
      fontSize: '100px',
    },
    brrr: {
      fontSize: '50px',
    },
    '@keyframes shake': {
      '0%': {
        transform: 'translate3D(0,0,0)',
      },
      '20%': {
        transform: 'translate3D(-5px,5px,0)',
      },
      '40%': {
        transform: 'translate3D(0px,5px,0)',
      },
      '60%': {
        transform: 'translate3D(-5px,0px,0)',
      },
      '80%': {
        transform: 'translate3D(0px,-5px,0)',
      },
    },
  },
  { name: 'GameLoading' },
)

export const GameLoading = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.rocket}>🚀</div>
      <h1 className={classes.brrr}>BRRRRRRRRRRRRRR</h1>
    </div>
  )
}

export default GameLoading
