import React, { useMemo, useState } from 'react'
import { extent } from 'd3'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import * as types from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'StonkLineGraph' },
)

type View = 'round' | 'all'

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
  const [view, setView] = useState<View>('round')

  const data = useMemo(() => {
    let data = history.map((hp) => ({
      ts: hp.ts,
      price: hp.stonks[ticker].price,
      round: hp.round,
    }))
    if (view === 'round') {
      data = data.filter(d => d.round === game.round)
    }
    return data;
  }, [history, ticker, view])

  const priceAtOpen = data[0].price
  const range = extent(data, (d) => d.price) as [number, number]
  const rangeAmount = range ? range[1] - range[0] : 0;
  const padding = Math.max(100, rangeAmount * 0.1)
  

  return <div className={cn(classes.root, className)}>{ticker}</div>
}

export default StonkLineGraph
