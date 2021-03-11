import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'
import MarketDay from './MarketDay'
import MarketStatus from './MarketStatus'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'MarketInfo' },
)

interface MarketInfoProps {
  game: Game
}

export const MarketInfo = ({ game }: MarketInfoProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <MarketStatus game={game} />
      <MarketDay game={game} />
    </div>
  )
}

export default MarketInfo
