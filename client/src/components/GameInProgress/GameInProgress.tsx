import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../../types/game'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'GameInProgress' },
)

export interface GameInProgressProps {
  game: Game
  nickname: string
}
export const GameInProgress = ({ game, nickname }: GameInProgressProps) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <p>you are {nickname}</p>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  )
}

export default GameInProgress
