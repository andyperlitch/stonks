import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'StonkPregameInfo' },
)

export interface StonkPregameInfoProps {
  game: Game
  ticker: string
}
export const StonkPregameInfo = ({ game, ticker }: StonkPregameInfoProps) => {
  const classes = useStyles()
  return <div className={classes.root}>An awesome stonk</div>
}

export default StonkPregameInfo
