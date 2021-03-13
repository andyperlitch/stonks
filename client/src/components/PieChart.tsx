import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import * as d3 from 'd3'
import { PieArcDatum } from 'd3-shape'

const useStyles = createUseStyles(
  {
    pie: {},
  },
  { name: 'PieChart' },
)

export interface PieSlice {
  /** must identify the slice */
  id: any
  /** from 0 - 100 */
  value: number
  offset: number
  color: string
}

type SliceDatum = PieArcDatum<PieSlice>

export interface PieChartProps {
  slices: PieSlice[]
  outerRadius: number
  innerRadius?: number
  sort?: (a: PieSlice, b: PieSlice) => number
}
export const PieChart = ({
  slices,
  outerRadius,
  innerRadius = 0,
}: PieChartProps) => {
  const classes = useStyles()
  const ref = useRef<SVGSVGElement>(null)

  // pie data generator
  const pie = useMemo(() => {
    return d3.pie<PieSlice>().value((s) => s.value)
  }, [])

  // arc generator
  const { arc, arcTween } = useMemo(() => {
    const arc = d3
      .arc<SliceDatum>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
    const arcTween = (newAngle: number) => (d: SliceDatum) => {
      const interpolate = d3.interpolate(d.endAngle, newAngle)
      return (t: number) => {
        d.endAngle = interpolate(t)
        return arc(d)
      }
    }
    return { arc, arcTween }
  }, [innerRadius, outerRadius])

  /**
   * Returns a tween for a transition’s "d" attribute, transitioning any selected
  // arcs from their current angle to the specified new angle.
  * @link http://bl.ocks.org/mbostock/5100636
  */

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const data = pie(slices)
    const svg = d3.select(ref.current).select('g')
    const t = d3.transition().duration()
  }, [ref, arc, pie, slices])

  return (
    <svg
      className={classes.pie}
      ref={ref}
      height={outerRadius * 2}
      width={outerRadius * 2}
    >
      <g transform={`translate(${outerRadius}, ${outerRadius})`}></g>
    </svg>
  )
}

export default PieChart
