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
    },
    rocket: {
      fontSize: '100px',
    },
    brrr: {
      fontSize: '50px',
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
