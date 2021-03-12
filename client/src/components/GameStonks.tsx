import React, { useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { PlayerPortfolio } from '../../types/game'
import { useGame } from '../hooks/useGame'
import { centsToPrice } from '../utils/centsToPrice'
import Button from './Button'
import Card from './Card'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'space-around',
    },
    stonk: {
      width: '23%',
      marginRight: '2%',
      marginBottom: '16px',
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
  const { game, socket, gameId, nickname } = useGame()
  const stonks = useMemo(() => {
    const portfolio: PlayerPortfolio =
      nickname && game ? game.players[nickname].portfolio : {}
    return Object.values(game?.stonks || {})
      .sort((a, b) => a.ticker.localeCompare(b.ticker))
      .map((s) => ({
        ...s,
        position: portfolio[s.ticker]?.shares ?? 0,
        buy: () => {
          if (socket) {
            socket.emit('buy', {
              gameId,
              ticker: s.ticker,
              shares: 1,
            })
          }
        },
        sell: () => {
          if (socket) {
            socket.emit('sell', {
              gameId,
              ticker: s.ticker,
              shares: 1,
            })
          }
        },
      }))
  }, [game, gameId, socket, nickname])

  // for typing... this should always be defined
  if (!game) {
    return null
  }

  return (
    <div className={classes.root}>
      {stonks.map((stonk) => {
        return (
          <Card className={classes.stonk} key={stonk.ticker}>
            <h3 className={classes.ticker}>{stonk.ticker}</h3>
            <h4 className={classes.price}>{centsToPrice(stonk.price)}</h4>
            <div className={classes.actions}>
              <Button
                className={classes.buy}
                disabled={game.round % 2 !== 0}
                onClick={stonk.buy}
              >
                buy
              </Button>
              <Button
                className={classes.sell}
                disabled={game.round % 2 !== 0}
                onClick={stonk.sell}
              >
                sell
              </Button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default GameStonks
