import React from 'react'
import { createUseStyles } from 'react-jss'
import cn from 'classnames'
import { Game } from '../../types/game'
import Card from './Card'
import MarketDay from './MarketDay'
import MarketStatus from './MarketStatus'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    marketDay: {
      flexGrow: '1',
    },
  },
  { name: 'MarketInfo' },
)

interface MarketInfoProps {
  game: Game
  className?: string
}

export const MarketInfo = ({ game, className }: MarketInfoProps) => {
  const classes = useStyles()

  return (
    <Card className={cn(classes.root, className)}>
      <MarketStatus game={game} />
      <MarketDay game={game} />
    </Card>
  )
}

export default MarketInfo
