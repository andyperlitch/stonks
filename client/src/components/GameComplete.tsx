import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'GameComplete' },
)

export interface GameCompleteProps {
  game: Game | null
  nickname: string | null
}
export const GameComplete = ({ game }: GameCompleteProps) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      GAME OVER MAN <a href="/">HOME</a>
    </div>
  )
}

export default GameComplete
