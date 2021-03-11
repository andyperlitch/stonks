import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'TotalEquityGraph' },
)

export interface TotalEquityGraphProps {
  game: Game
  nickname: string
}
export const TotalEquityGraph = ({ game, nickname }: TotalEquityGraphProps) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      Placeholder for graph ({game.players[nickname].totalEquity})
    </div>
  )
}

export default TotalEquityGraph
