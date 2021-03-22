import { ScaleLinear, ScaleTime } from 'd3-scale'
import React from 'react'
import { createUseStyles } from 'react-jss'
import * as types from '../../../types/game'

const useStyles = createUseStyles(
  {
    line: {
      stroke: 'white',
      strokeDasharray: '4 2',
      strokeWidth: '1px',
    },
  },
  { name: 'EndingBellLine' },
)

export interface EndingBellLineProps {
  game: types.Game
  x: ScaleTime<number, number>
  y: ScaleLinear<number, number>
}
export const EndingBellLine = ({ game, x, y }: EndingBellLineProps) => {
  const classes = useStyles()

  // get the open round object
  const marketHoursRound =
    game.rounds[game.round % 2 === 0 ? game.round : game.round - 1]
  const xCoord = x(marketHoursRound.endTime)
  const yCoords = y.range()

  return (
    <line
      className={classes.line}
      x1={xCoord}
      y1={yCoords[0]}
      x2={xCoord}
      y2={yCoords[1]}
    />
  )
}

export default EndingBellLine
