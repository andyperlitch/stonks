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
      display: 'flex',
      flexDirection: 'column',
    },
    ticker: {
      textDecoration: 'none',
      fontSize: '40px',
    },
    infoValue: {
      fontSize: '30px',
    },
    info: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    infoColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    infoHeading: {
      fontSize: '14px',
    },
    actions: {
      display: 'flex',
      width: '100%',
      alignItems: 'stretch',
    },
    buy: {
      marginRight: '1rem',
      backgroundColor: '#288c00',
      flexGrow: '1',
      '&:hover': {
        backgroundColor: '#20a900',
      },
      '&:active': {
        backgroundColor: '#45b700',
      },
      '&.disabled': {
        opacity: 0.5,
      },
      '&.disabled:hover': {
        backgroundColor: '#288c00',
      },
    },
    sell: {
      backgroundColor: '#db0000',
      flexGrow: '1',
      '&:hover': {
        backgroundColor: '#f92d2d',
      },
      '&:active': {
        backgroundColor: '#f95757',
      },
      '&.disabled': {
        opacity: 0.5,
      },
      '&.disabled:hover': {
        backgroundColor: '#db0000',
      },
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
            <div className={classes.info}>
              <div className={classes.infoColumn}>
                <h2 className={classes.ticker}>{stonk.ticker}</h2>
                <div>
                  <h4 className={classes.infoHeading}>Price</h4>
                  <div className={classes.infoValue}>
                    {centsToPrice(stonk.price)}
                  </div>
                </div>
              </div>
              <div className={classes.infoColumn}>
                <div>
                  <h4 className={classes.infoHeading}>Shares</h4>
                  <div className={classes.infoValue}>
                    {stonk.position.toLocaleString()}
                  </div>
                </div>
                <div>
                  <h4 className={classes.infoHeading}>Equity</h4>
                  <div className={classes.infoValue}>
                    {centsToPrice(stonk.position * stonk.price)}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.actions}>
              <Button
                size="md"
                className={classes.buy}
                disabled={game.round % 2 !== 0}
                onClick={stonk.buy}
              >
                buy
              </Button>
              <Button
                size="md"
                className={classes.sell}
                disabled={game.round % 2 !== 0 || stonk.position === 0}
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
