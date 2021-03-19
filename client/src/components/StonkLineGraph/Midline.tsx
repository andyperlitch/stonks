import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import * as d3 from 'd3'

const useStyles = createUseStyles(
  {
    root: {
      stroke: 'white',
      strokeDasharray: '3 3',
      strokeWidth: '1px',
    },
  },
  { name: 'Midline' },
)

export interface MidlineProps {
  priceAtOpen: number
  x: d3.ScaleTime<number, number>
  y: d3.ScaleLinear<number, number>
}
export const Midline = ({ priceAtOpen, x, y }: MidlineProps) => {
  const classes = useStyles()
  const ref = useRef<SVGLineElement>(null)

  useEffect(() => {
    const range = x.range()
    const yRange = y.range()
    const yCoord = priceAtOpen ? y(priceAtOpen) : (yRange[1] - yRange[0]) / 2
    d3.select(ref.current)
      .transition()
      .attr('x1', range[0])
      .attr('x2', range[1])
      .attr('y1', yCoord)
      .attr('y2', yCoord)
  }, [x, y, priceAtOpen])

  return <line className={classes.root} ref={ref}></line>
}

export default Midline
