import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import useResizeObserver from 'use-resize-observer'
import { createUseStyles } from 'react-jss'
import { Game, GameHistoricalPoint, Player } from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      height: '100%',
    },
    line: {
      fill: 'none',
      strokeWidth: '2px',
    },
  },
  { name: 'TotalEquityGraph' },
)

const MIN_Y_DOMAIN_TOP = 20000

interface LineDatum {
  equity: number
  ts: number
}
interface Datum {
  player: Player
  equityData: LineDatum[]
}

export interface TotalEquityGraphProps {
  game: Game
  history: GameHistoricalPoint[]
  nickname: string
}
export const TotalEquityGraph = ({ game, history }: TotalEquityGraphProps) => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useResizeObserver<HTMLDivElement>({ ref })

  // this should work but for some reason TS thinks d3.Line does not exist (it does)
  // const lastLine = useRef<d3.Line<StonkDataPoint>()
  const lastLine = useRef<any>()

  useEffect(() => {
    if (!width || !height) {
      return
    }
    // filter events for time frame
    const filteredHistory = history.filter(
      (p) =>
        p.ts >= game.rounds[0].startTime &&
        p.ts <= game.rounds[game.rounds.length - 1].endTime,
    )

    // track domain of equity
    const yDomain = [Infinity, -Infinity]

    // create data of every player
    const data: Datum[] = Object.keys(game.players).map((name: string) => {
      const player = game.players[name]
      return {
        player,
        equityData: filteredHistory.map((point) => {
          const equity = point.players[player.name].totalEquity
          yDomain[0] = Math.min(equity, yDomain[0])
          yDomain[1] = Math.max(equity, yDomain[1])
          return { equity, ts: point.ts }
        }),
      }
    })

    yDomain[0] = Math.max(yDomain[0] - yDomain[1] * 0.1, 0)
    yDomain[1] = Math.max(yDomain[1] * 1.1, MIN_Y_DOMAIN_TOP)

    // create xDomain from total game time
    const xDomain = [
      game.rounds[0].startTime,
      game.rounds[game.rounds.length - 1].endTime,
    ]

    // create ranges from available pixel dimensions
    const yRange = [height ?? 100, 0]

    const xRange = [0, width ?? 100]

    // create scales
    const x = d3.scaleTime().domain(xDomain).range(xRange)
    const y = d3.scaleLinear().domain(yDomain).range(yRange)

    // create line generator
    const line = d3
      .line<LineDatum>()
      .x((d) => x(d.ts))
      .y((d) => y(d.equity))

    // draw lines
    d3.select(ref.current)
      .select('g')
      .selectAll<SVGPathElement, Datum>(`path.${classes.line}`)
      .data(data, (d) => d.player.name)
      .join((enter) =>
        enter
          .append('path')
          .classed(classes.line, true)
          .attr('stroke', (d) => d.player.color),
      )
      .attr('d', (d) => {
        if (d.equityData.length <= 1) {
          return line(d.equityData)
        }
        // create line with next point at same location as previous point
        const lastWithNextPoint = d.equityData.slice(0, d.equityData.length - 1)
        const nextPointSetup = {
          ...lastWithNextPoint[lastWithNextPoint.length - 1],
        }

        // add duplicated last point to the end of the array
        lastWithNextPoint.push(nextPointSetup)
        const lineToUse = lastLine.current || line
        return lineToUse(lastWithNextPoint)
      })
      .transition()
      .attr('d', (d) => line(d.equityData))

    lastLine.current = line
  }, [history, width, height])

  return (
    <div className={classes.root} ref={ref}>
      <svg width={width} height={height}>
        <g></g>
      </svg>
    </div>
  )
}

export default TotalEquityGraph
