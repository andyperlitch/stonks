import React from 'react'
import { createUseStyles } from 'react-jss'
import { PortfolioItem as Item, Stonk } from '../../types/game'
import { centsToPrice } from '../utils/centsToPrice'

const useStyles = createUseStyles(
  {
    root: {},
    value: {
      fontSize: '14px',
    },
  },
  { name: 'PortfolioItem' },
)

export interface PortfolioItemProps {
  item: Item
  stonk: Stonk
}
export const PortfolioItem = ({ item, stonk }: PortfolioItemProps) => {
  const classes = useStyles()
  const equity = item.shares * stonk.price
  return (
    <div className={classes.root}>
      <h4>{item.ticker}</h4>
      <div className={classes.value}>{centsToPrice(equity)}</div>
    </div>
  )
}

export default PortfolioItem
