import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'MarketDay' },
)

export interface MarketDayProps {
  game: Game
}
export const MarketDay = ({ game }: MarketDayProps) => {
  const classes = useStyles()

  const totalDays = game.config.numberOfDays
  const curDay = Math.floor(game.round / 2)

  return (
    <div className={classes.root}>
      <h3>Day</h3>
      <p>
        {curDay} of {totalDays}
      </p>
    </div>
  )
}

export default MarketDay
