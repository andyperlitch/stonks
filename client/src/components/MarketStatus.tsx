import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'
import DonutTimer from './DonutTimer'

const OPEN_ELAPSED_COLOR = '#009245'
const OPEN_REMAINING_COLOR = '#b0b0b044'
const CLOSED_ELAPSED_COLOR = '#d62b16'
const CLOSED_REMAINING_COLOR = '#b0b0b044'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  { name: 'MarketStatus' },
)

export interface MarketStatusProps {
  game: Game
}
export const MarketStatus = ({ game }: MarketStatusProps) => {
  const classes = useStyles()

  let roundStartTime: number
  let elapsedColor: string
  let remainingColor: string

  if (game.round % 2 === 0) {
    // open
    roundStartTime = game.roundEndTime - game.config.marketHoursDuration
    elapsedColor = OPEN_ELAPSED_COLOR
    remainingColor = OPEN_REMAINING_COLOR
  } else {
    // closed
    roundStartTime = game.roundEndTime - game.config.afterHoursDuration
    elapsedColor = CLOSED_ELAPSED_COLOR
    remainingColor = CLOSED_REMAINING_COLOR
  }

  return (
    <div className={classes.root}>
      <h3>Status</h3>
      <DonutTimer
        end={new Date(game.roundEndTime)}
        start={new Date(roundStartTime)}
        fg={elapsedColor}
        bg={remainingColor}
        outerRadius={70}
        innerRadius={40}
      />
      <div>{game.round % 2 ? 'Closed' : 'Open'}</div>
    </div>
  )
}

export default MarketStatus
