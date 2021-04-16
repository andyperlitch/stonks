import React from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { centsToPrice } from '../utils/centsToPrice'
import Card from './Card'
import TotalEquityGraph from './TotalEquityGraph'
import MovingNumber from './MovingNumber'
import { useGame } from '../hooks/useGame'
import UpDownPrice from './UpDownPrice'

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
      flexGrow: 1,
    },
  },
  { name: 'Portfolio' },
)

export interface PortfolioProps {
  className?: string
}
export const Portfolio = ({ className }: PortfolioProps) => {
  const classes = useStyles()

  const { nickname, game, history } = useGame()

  if (!game || !nickname) {
    return null
  }

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
            <UpDownPrice cents={player.totalEquity} />
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
        {game.status !== 'NOT_STARTED' && game.status !== 'CANCELLED' && (
          <TotalEquityGraph game={game} nickname={nickname} history={history} />
        )}
      </div>
    </Card>
  )
}

export default Portfolio
