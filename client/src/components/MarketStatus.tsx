import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'MarketStatus' },
)

export interface MarketStatusProps {
  game: Game
}
export const MarketStatus = ({ game }: MarketStatusProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h3>Status</h3>
      <div>{game.round % 2 ? 'Closed' : 'Open'}</div>
    </div>
  )
}

export default MarketStatus
