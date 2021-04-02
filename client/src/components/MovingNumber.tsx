import React, { useEffect, useMemo, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import * as d3 from 'd3'

const HEIGHT = 1.3

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: `${HEIGHT}em`,
      overflow: 'hidden',
    },
    charPos: {},
    numberPos: {},
    position: {
      height: `${HEIGHT}em`,
      lineHeight: `${HEIGHT}em`,
      position: 'relative',
    },
    char: {},
    number: {
      height: `${HEIGHT}em`,
    },
  },
  { name: 'MovingNumber' },
)

const NUMBERS = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
}

interface CharData {
  id: string
  char: string
  isNumber: boolean
}

export interface MovingNumberProps {
  numString: string
}
export const MovingNumber = React.memo(({ numString }: MovingNumberProps) => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)

  const charData = useMemo(() => {
    const chars = (numString ?? '').split('')

    const charData: CharData[] = chars.map((c, i) => {
      const isNumber = NUMBERS.hasOwnProperty(c)
      return {
        id: `${isNumber ? 'num' : 'char'}-${chars.length - i}`,
        char: c,
        isNumber,
      }
    })

    return charData
  }, [numString])

  useEffect(() => {
    d3.select(ref.current)
      .selectAll<HTMLDivElement, CharData>(`div.${classes.position}`)
      .data(charData, (d) => d.id)
      .join((enter) => {
        const char = enter
          .append('div')
          .classed(classes.position, true)
          .classed(classes.charPos, (d) => !d.isNumber)
          .classed(classes.numberPos, (d) => d.isNumber)

        char
          .filter((d) => d.isNumber)
          .selectAll(`div.${classes.number}`)
          .data([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
          .join(
            (enter) =>
              enter
                .append('div')
                .classed(classes.number, true)
                .text((d) => d),
            (update) => update,
            (exit) => exit.remove(),
          )

        char.filter((d) => !d.isNumber).text((d) => d.char)

        return char
      })
      .filter((d) => d.isNumber)
      .transition()
      .style('top', (d) => `-${(9 - Number(d.char)) * HEIGHT}em`)
  }, [numString, classes, charData])

  return <div ref={ref} className={classes.root}></div>
})

export default MovingNumber
