import React, { useMemo, useState } from 'react'
import * as d3 from 'd3'
import cn from 'classnames'
import useResizeObserver from 'use-resize-observer'
import { createUseStyles } from 'react-jss'
import * as types from '../../../types/game'
import Midline from './Midline'
import { StonkDataPoint } from './types'
import Priceline from './Priceline'

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    svg: {
      width: '100%',
    },
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
  const buildViewChangeHandler = (v: View) => (e) => {
    e.preventDefault()
    setView(v)
  }

  const { ref, width, height } = useResizeObserver<HTMLDivElement>()

  const { data, yDomain, xDomain, priceAtOpen } = useMemo(() => {
    // get stonk-specific data
    let data = history.map(
      (hp) =>
        ({
          ts: hp.ts,
          price: hp.stonks[ticker].price,
          round: hp.round,
        } as StonkDataPoint),
    )

    let xDomain: [Date, Date]

    // filter if there is a round selected
    if (view === 'round') {
      data = data.filter((d) => d.round === game.round)
      const roundObj = game.rounds[game.round]
      xDomain = [new Date(roundObj.startTime), new Date(roundObj.endTime)]
    } else {
      xDomain = [
        new Date(game.rounds[0].startTime),
        new Date(game.rounds[game.rounds.length - 1].endTime),
      ]
    }

    // get the price at open
    const priceAtOpen = data[0] ? data[0].price : game.stonks[ticker].price

    // calc the y domain
    const yDomain = d3.extent(data, (d) => d.price) as [number, number]
    if (
      typeof yDomain[0] === 'undefined' ||
      typeof yDomain[1] === 'undefined'
    ) {
      yDomain[1] = yDomain[0] = 0
    }
    const rangeAmount = yDomain[1] ? yDomain[1] - yDomain[0] : 0
    const yPadding = Math.max(100, priceAtOpen * 0.2, rangeAmount * 0.1)
    yDomain[0] -= yPadding
    yDomain[1] += yPadding

    return { data, yDomain, xDomain, priceAtOpen }
  }, [history, ticker, view])

  const { x, y } = useMemo(() => {
    console.log(`yDomain`, yDomain)
    const x = d3.scaleTime(xDomain, [0, width]) as d3.ScaleTime<number, number>
    const y = d3.scaleLinear(yDomain, [height, 0]) as d3.ScaleLinear<
      number,
      number
    >
    console.log(`y.range()`, y.range())
    return { x, y }
  }, [xDomain, yDomain, width, height])

  return (
    <div className={cn(classes.root, className)} ref={ref}>
      {height && (
        <svg className={classes.svg} width={width}>
          <Midline priceAtOpen={priceAtOpen} y={y} x={x} />
          <Priceline data={data} y={y} x={x} priceAtOpen={priceAtOpen} />
        </svg>
      )}
      <div>
        {view === 'round' ? (
          <span>round</span>
        ) : (
          <a href="" onClick={buildViewChangeHandler('round')}>
            round
          </a>
        )}
        <span>|</span>
        {view === 'all' ? (
          <span>all</span>
        ) : (
          <a href="" onClick={buildViewChangeHandler('all')}>
            all
          </a>
        )}
      </div>
    </div>
  )
}

export default StonkLineGraph
