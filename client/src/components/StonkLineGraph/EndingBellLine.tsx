import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import * as types from '../../../types/game'
import { getDayForRound } from '../../utils/rounds'

const useStyles = createUseStyles(
  {
    line: {
      stroke: 'rgba(255,255,255,0.3)',
      strokeDasharray: '1 4',
      strokeWidth: '1px',
    },
  },
  { name: 'EndingBellLine' },
)

export interface EndingBellLineProps {
  game: types.Game
  x: d3.ScaleTime<number, number>
  y: d3.ScaleLinear<number, number>
}
export const EndingBellLine = ({ game, x, y }: EndingBellLineProps) => {
  const classes = useStyles()
  const ref = useRef<SVGLineElement>(null)

  useEffect(() => {
    // get the open round object
    const [marketHoursRound] = getDayForRound(game)
    const xCoord = x(marketHoursRound.endTime)
    const yCoords = y.range()
    d3.select(ref.current)
      .datum({ xCoord, yCoords })
      .transition()
      .attr('x1', (d) => d.xCoord)
      .attr('x2', (d) => d.xCoord)
      .attr('y1', (d) => d.yCoords[0])
      .attr('y2', (d) => d.yCoords[1])
  }, [x, y])

  return <line className={classes.line} ref={ref} />
}

export default EndingBellLine
