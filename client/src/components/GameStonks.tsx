import React, { useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { useGame } from '../hooks/useGame'
import { centsToPrice } from '../utils/centsToPrice'
import Button from './Button'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'space-around',
    },
    stonk: {
      width: '23%',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
      margin: '1%',
      padding: '1rem',
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
    },
    ticker: {
      fontSize: '30px',
    },
    price: {
      fontSize: '50px',
    },
    actions: {
      display: 'flex',
      width: '100%',
      alignItems: 'stretch',
    },
    buy: {
      marginRight: '1rem',
      backgroundColor: 'green',
      flexGrow: '1',
    },
    sell: {
      backgroundColor: 'red',
      flexGrow: '1',
    },
  },
  { name: 'GameStonks' },
)

export const GameStonks = () => {
  const classes = useStyles()
  const { game } = useGame()
  const stonks = useMemo(() => {
    return Object.values(game?.stonks || {}).sort((a, b) =>
      a.ticker.localeCompare(b.ticker),
    )
  }, [game])

  // for typing... this should always be defined
  if (!game) {
    return null
  }

  return (
    <div className={classes.root}>
      {stonks.map((stonk) => {
        return (
          <div className={classes.stonk} key={stonk.ticker}>
            <h3 className={classes.ticker}>{stonk.ticker}</h3>
            <h4 className={classes.price}>{centsToPrice(stonk.price)}</h4>
            <div className={classes.actions}>
              <Button className={classes.buy} disabled={game.round % 2 !== 0}>
                buy
              </Button>
              <Button className={classes.sell} disabled={game.round % 2 !== 0}>
                sell
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GameStonks
