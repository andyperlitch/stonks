import React from 'react'
import { createUseStyles } from 'react-jss'
import { Player } from '../../types/game'
import { centsToPrice } from '../utils/centsToPrice'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
    },
  },
  { name: 'LeaderboardItem' },
)

export interface LeaderboardItemProps {
  player: Player
  rank: number
}
export const LeaderboardItem = ({ player, rank }: LeaderboardItemProps) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <span>{rank}.</span>
      <span>{player.name}</span>
      <span>(graph)</span>
      <span>{centsToPrice(player.totalEquity)}</span>
    </div>
  )
}

export default LeaderboardItem
