import React from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'
import { centsToPrice } from '../utils/centsToPrice'
import Card from './Card'
import TotalEquityGraph from './TotalEquityGraph'
import MovingNumber from './MovingNumber'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
    left: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginRight: '16px',
    },
    totalEquity: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flexGrow: '1',
    },
    buyingPower: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flexGrow: '1',
    },
    totalEquityValue: {
      fontSize: '35px',
    },
    buyingPowerValue: {
      fontSize: '24px',
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { name: 'Portfolio' },
)

export interface PortfolioProps {
  game: Game
  nickname: string
  className?: string
}
export const Portfolio = ({ game, nickname, className }: PortfolioProps) => {
  const classes = useStyles()

  const player = game.players[nickname]
  if (!player) {
    return null
  }

  return (
    <Card className={cn(classes.root, className)}>
      <div className={classes.left}>
        <div className={classes.totalEquity}>
          <h3>Total Equity</h3>
          <div className={classes.totalEquityValue}>
            <MovingNumber numString={centsToPrice(player.totalEquity)} />
          </div>
        </div>
        <div className={classes.buyingPower}>
          <h4>Buying Power</h4>
          <div className={classes.buyingPowerValue}>
            <MovingNumber numString={centsToPrice(player.buyingPower)} />
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <TotalEquityGraph game={game} nickname={nickname} />
      </div>
    </Card>
  )
}

export default Portfolio
