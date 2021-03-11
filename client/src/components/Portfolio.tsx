import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'
import { centsToPrice } from '../utils/centsToPrice'
import PortfolioItem from './PortfolioItem'
import TotalEquityGraph from './TotalEquityGraph'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    topRow: {
      display: 'flex',
    },
    topLeft: {
      display: 'flex',
      flexDirection: 'column',
    },
    totalEquityValue: {
      fontSize: '35px',
    },
    buyingPowerValue: {},
    topRight: {},
    bottomRow: {
      display: 'flex',
      flexDirection: 'column',
    },
    positions: {
      display: 'flex',
    },
  },
  { name: 'Portfolio' },
)

export interface PortfolioProps {
  game: Game
  nickname: string
}
export const Portfolio = ({ game, nickname }: PortfolioProps) => {
  const classes = useStyles()

  const player = game.players[nickname]
  if (!player) {
    return null
  }
  const stonks = game.stonks
  const portfolio = player.portfolio
  const portfolioItems = Object.keys(player.portfolio)

  return (
    <div className={classes.root}>
      <div className={classes.topRow}>
        <div className={classes.topLeft}>
          <h3>Total Equity</h3>
          <div className={classes.totalEquityValue}>
            {centsToPrice(player.totalEquity)}
          </div>
          <h4>Buying Power</h4>
          <div className={classes.buyingPowerValue}>
            {centsToPrice(player.buyingPower)}
          </div>
        </div>
        <div className={classes.topRight}>
          <TotalEquityGraph game={game} nickname={nickname} />
        </div>
      </div>
      <div className={classes.bottomRow}>
        <h3>Positions</h3>
        <div className={classes.positions}>
          {portfolioItems.map((pi) => {
            const item = portfolio[pi]
            const stonk = stonks[item.ticker]
            return <PortfolioItem key={item.ticker} item={item} stonk={stonk} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
