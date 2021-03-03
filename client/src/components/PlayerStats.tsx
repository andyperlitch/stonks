import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'
import { centsToPrice } from '../utils/centsToPrice'

const useStyles = createUseStyles(
  {
    root: {},
    buyingPower: {},
    totalEquity: {},
  },
  { name: 'PlayerStats' },
)

export interface PlayerStatsProps {
  game: Game
  nickname: string
}
export const PlayerStats = ({ game, nickname }: PlayerStatsProps) => {
  const classes = useStyles()
  const player = game.players[nickname]
  if (!player) {
    return null
  }
  return (
    <div className={classes.root}>
      <h3>{player.name}</h3>
      <div className={classes.buyingPower}>
        <strong>buying power: </strong>
        {centsToPrice(player.buyingPower)}
      </div>
      <div className={classes.totalEquity}>
        <strong>total equity: </strong>
        {centsToPrice(player.totalEquity)}
      </div>
    </div>
  )
}

export default PlayerStats
