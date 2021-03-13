import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import * as d3 from 'd3'
import { PieArcDatum } from 'd3-shape'

const useStyles = createUseStyles(
  {
    pie: {},
    fg: {
      filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))',
    },
    bg: {
      filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))',
    },
  },
  { name: 'DonutTimer' },
)

interface SliceDatum {
  id: 'bg' | 'fg'
  color: string
  value: number
}

type Datum = PieArcDatum<SliceDatum>

function arcTween(arc: d3.Arc<any, Datum>) {
  return function factory(d: Datum) {
    const oldData: Datum = this._current || d
    const startAngleInterp = d3.interpolate(oldData.startAngle, d.startAngle)
    const endAngleInterp = d3.interpolate(oldData.endAngle, d.endAngle)
    return function interpolator(t: number) {
      return arc({
        ...d,
        startAngle: startAngleInterp(t),
        endAngle: endAngleInterp(t),
      })
    }
  }
}

export interface DonutTimerProps {
  /** when the timer begins */
  start: Date
  /** when the timer ends */
  end: Date
  /** the foreground color of the timer */
  fg: string
  /** the background color of the timer */
  bg: string
  outerRadius: number
  innerRadius: number
}
export const DonutTimer = ({
  start,
  end,
  fg,
  bg,
  outerRadius,
  innerRadius,
}: DonutTimerProps) => {
  const classes = useStyles()
  // A way to force re-render at a later time
  const [check, forceUpdate] = useState(0)
  const ref = useRef<SVGSVGElement>(null)

  // pie data generator
  const pie = useMemo(() => {
    return d3
      .pie<SliceDatum>()
      .value((d) => d.value)
      .sort((a, b) => {
        if (a.id === 'bg') {
          return -1
        }
        return 1
      })
  }, [])

  // arc generator
  const arc = useMemo(() => {
    return d3.arc<Datum>().innerRadius(innerRadius).outerRadius(outerRadius)
  }, [innerRadius, outerRadius])

  // Get MS of start and end
  const startMS = start.valueOf()
  const endMS = end.valueOf()

  // d3 render, animation
  useEffect(() => {
    if (!ref.current) {
      return
    }
    console.log('useEffect called')
    const now = new Date()
    const nowMS = now.valueOf()
    const totalMS = endMS - startMS

    // generate the data structure for foreground and background
    const data: SliceDatum[] = [
      {
        id: 'bg',
        color: bg,
        // minimum is 0, maximum is length of the timer
        value: Math.max(0, Math.min(totalMS, nowMS - startMS)),
      },
      // remaining time
      {
        id: 'fg',
        color: fg,
        // minimum 0, maximum is the length of the timer
        value: Math.max(0, Math.min(totalMS, endMS - nowMS)),
      },
    ]

    // STATIC RENDER
    const svg = d3.select(ref.current).select('g')

    svg
      .selectAll<SVGPathElement, Datum>('path')
      .data(pie(data), (d) => d.data.id)
      .join((enter) => enter.append('path'))
      .attr('d', arc)
      .each(function (d) {
        // set the current data on the element (used in arcTween)
        ;(this as any)._current = d
      })
      .classed(classes.fg, (d) => d.data.id === 'fg')
      .classed(classes.bg, (d) => d.data.id === 'bg')
      .attr('fill', (d) => d.data.color)

    if (startMS > nowMS) {
      const timeoutId = setTimeout(
        () => forceUpdate(check + 1),
        startMS - now.valueOf() + 100,
      )
      return () => clearTimeout(timeoutId)
    }

    if (endMS < nowMS) {
      return
    }

    // animation time
    // change data so that foreground is to destination
    const finalData: SliceDatum[] = [
      {
        id: 'bg',
        color: bg,
        // minimum is 0, maximum is length of the timer
        value: totalMS,
      },
      // remaining time
      {
        id: 'fg',
        color: fg,
        // minimum 0, maximum is the length of the timer
        value: 0,
      },
    ]

    const t = d3
      .transition()
      .duration(endMS - nowMS)
      .ease(d3.easeLinear)

    svg
      .selectAll<SVGPathElement, Datum>('path')
      .data(pie(finalData), (d) => d.data.id)
      .join(
        (enter: any) => enter.append('path').attr('d', arc),
        (update: any) => update,
      )
      .call((update) =>
        update.transition(t as any).attrTween('d', arcTween(arc) as any),
      )

    return () => {
      svg.selectAll('path').interrupt()
    }
  }, [arc, check, bg, fg, startMS, endMS, pie, classes.fg, classes.bg])

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

export default DonutTimer
