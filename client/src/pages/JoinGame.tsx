import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  container: {},
})

export interface JoinGameProps {}
export const JoinGame = ({}: JoinGameProps) => {
  const classes = useStyles()
  return <div className={classes.container}>Join game</div>
}

export default JoinGame
