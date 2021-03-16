import React from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import * as types from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'StonkLineGraph' },
)

export interface StonkLineGraphProps {
  game: types.Game
  ticker: string
  history: types.GameHistoricalPoint[]
  className?: string
}
export const StonkLineGraph = ({
  game,
  ticker,
  history,
  className,
}: StonkLineGraphProps) => {
  const classes = useStyles()
  return <div className={cn(classes.root, className)}>{ticker}</div>
}

export default StonkLineGraph
