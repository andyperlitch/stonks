import React from 'react'
import { createUseStyles } from 'react-jss'
import { useParams } from 'react-router'

const useStyles = createUseStyles({
  root: {},
})

export const Game = () => {
  const classes = useStyles()
  const { id } = useParams<{ id: string }>()
  return <div className={classes.root}>game id: {id}</div>
}

export default Game
