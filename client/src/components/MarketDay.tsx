import React from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexGrow: '1',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    day: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
    },
    pastDay: {
      background: '#aeaeae',
    },
    curDay: {
      animation: '$pulse 2s infinite',
      background: 'white',
    },
    futureDay: {
      background: 'rgba(255, 255, 255, 0.3)',
    },
    '@keyframes pulse': {
      '0%': {
        boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.4)',
      },
      '70%': {
        boxShadow: '0 0 0 10px rgba(255, 255, 255, 0)',
      },
      '100%': {
        boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
      },
    },
  },
  { name: 'MarketDay' },
)

export interface MarketDayProps {
  game: Game
}
export const MarketDay = ({ game }: MarketDayProps) => {
  const classes = useStyles()

  const totalDays = game.config.numberOfDays
  const curDay = Math.floor(game.round / 2) + 1
  const days = Array.from(Array(totalDays).keys()).map((d) => d + 1)
  return (
    <div className={classes.root}>
      <h3>Day</h3>
      <div>
        {days.map((day) => (
          <div
            className={cn(classes.day, {
              [classes.curDay]: curDay === day,
              [classes.pastDay]: day < curDay,
              [classes.futureDay]: day > curDay,
            })}
            key={day}
          ></div>
        ))}
      </div>
      <p>
        {curDay} of {totalDays}
      </p>
    </div>
  )
}

export default MarketDay
