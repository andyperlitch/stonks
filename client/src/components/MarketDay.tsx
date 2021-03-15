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
    days: {
      display: 'flex',
      flexDirection: 'column',
    },
    day: {
      display: 'flex',
      flexDirection: 'row',
      width: '30px',
      justifyContent: 'space-between',
      marginBottom: '3px',
    },
    hoursDot: {
      borderRadius: '50%',
      width: '10px',
      height: '10px',
    },
    currentOpenHrs: {
      backgroundColor: '#49d849',
      animation: '$pulse 2s infinite',
    },
    pastOpenHrs: {
      backgroundColor: '#53eb4f54',
    },
    futureOpenHrs: {
      backgroundColor: '#1944178c',
    },
    currentAfterHrs: {
      backgroundColor: '#f82400',
      animation: '$pulse 2s infinite',
    },
    pastAfterHrs: {
      backgroundColor: '#c2130099',
    },
    futureAfterHrs: {
      backgroundColor: '#650c0056',
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
  const days = Array.from(Array(totalDays).keys()).map((d) => ({
    day: d + 1,
    rounds: [d * 2, d * 2 + 1],
  }))
  return (
    <div className={classes.root}>
      <h3>Day</h3>
      <div className={classes.days}>
        {days.map(({ day, rounds: [openRound, closedRound] }) => (
          <div className={classes.day} key={day}>
            {/* OPEN HOURS DOT */}
            <div
              className={cn(classes.hoursDot, {
                [classes.currentOpenHrs]: openRound === game.round,
                [classes.pastOpenHrs]: openRound < game.round,
                [classes.futureOpenHrs]: openRound > game.round,
              })}
            ></div>

            {/* AFTER HOURS DOT */}
            <div
              className={cn(classes.hoursDot, {
                [classes.currentAfterHrs]: closedRound === game.round,
                [classes.pastAfterHrs]: closedRound < game.round,
                [classes.futureAfterHrs]: closedRound > game.round,
              })}
            ></div>
          </div>
        ))}
      </div>
      <p>
        {curDay} of {totalDays}
      </p>
    </div>
  )
}

export default MarketDay
