import React from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { useGame } from '../hooks/useGame'
import CountDown from './CountDown'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    marketStatus: {
      color: 'black',
    },
    open: {
      background: 'green',
    },
    closed: {
      background: 'red',
    },
  },
  { name: 'GameBar' },
)

export const GameBar = () => {
  const classes = useStyles()
  const { game } = useGame()
  if (!game) {
    return null
  }
  const marketIsOpen = game.round % 2 === 0
  return (
    <div className={classes.root}>
      <span>
        Day {Math.ceil(game.round / 2)} of {game.config.numberOfDays}
      </span>
      <div
        className={cn(
          classes.marketStatus,
          marketIsOpen ? classes.open : classes.closed,
        )}
      >
        Market is {marketIsOpen ? 'open' : 'closed'}
      </div>
      <div>
        Market {marketIsOpen ? 'closes' : 'opens'} in{' '}
        <CountDown until={game.roundEndTime} />
      </div>
    </div>
  )
}

export default GameBar
