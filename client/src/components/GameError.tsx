import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'GameError' },
)

export interface GameErrorProps {}
export const GameError = () => {
  const classes = useStyles()
  return <div className={classes.root}>Errorrrrrrr</div>
}

export default GameError
