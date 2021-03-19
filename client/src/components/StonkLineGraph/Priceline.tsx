import React, { useEffect, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import { createUseStyles } from 'react-jss'
import { StonkDataPoint } from './types'

const useStyles = createUseStyles(
  {
    root: {},
    line: {
      fill: 'none',
      strokeWidth: '2px',
    },
    down: {
      stroke: 'red',
    },
    up: {
      stroke: 'green',
    },
  },
  { name: 'Priceline' },
)

export interface PricelineProps {
  priceAtOpen: number
  data: StonkDataPoint[]
  x: d3.ScaleTime<number, number>
  y: d3.ScaleLinear<number, number>
}
export const Priceline = ({ data, x, y, priceAtOpen }: PricelineProps) => {
  const classes = useStyles()
  const g = useRef<SVGGElement>(null)
  // this should work but for some reason TS thinks d3.Line does not exist (it does)
  // const lastLine = useRef<d3.Line<StonkDataPoint>()
  const lastLine = useRef<any>()

  const line = useMemo(() => {
    return d3
      .line<StonkDataPoint>()
      .x((d) => x(d.ts))
      .y((d) => y(d.price))
  }, [x, y])

  useEffect(() => {
    console.log(`data.length`, data.length)
    if (!g.current || !data.length) {
      return
    }
    d3.select(g.current)
      .selectAll('path')
      .data([data])
      .join((enter) => enter.append('path').classed(classes.line, true))
      .classed(classes.up, data[data.length - 1].price >= priceAtOpen)
      .classed(classes.down, data[data.length - 1].price < priceAtOpen)
      .attr('d', (d) => {
        // Add a new point at the same location as the last point, so that it transitions
        // to the next point's location
        if (d.length === 0) {
          return ''
        }
        if (d.length === 1) {
          return line(d)
        }
        const lastWithNextPoint = d.slice(0, d.length - 1)
        lastWithNextPoint.push(lastWithNextPoint[lastWithNextPoint.length - 1])

        const lineToUse = lastLine.current || line

        return lineToUse(lastWithNextPoint)
      })
      .transition()
      .attr('d', line)

    lastLine.current = line
  }, [data, priceAtOpen])

  return <g ref={g}></g>
}

export default Priceline
