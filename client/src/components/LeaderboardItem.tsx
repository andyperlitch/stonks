import React from 'react'
import { createUseStyles } from 'react-jss'
import { Player } from '../../types/game'
import { centsToPrice } from '../utils/centsToPrice'
import Card from './Card'
import PlayerIcon from './PlayerIcon'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '5px',
      paddingBottom: '5px',
      marginBottom: '5px',
    },
    left: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    right: {},
    playerIcon: {
      marginLeft: '5px',
      marginRight: '5px',
    },
    playerName: {
      marginLeft: '5px',
      marginRight: '5px',
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
    <Card className={classes.root}>
      <div className={classes.left}>
        <span>{rank}.</span>
        <PlayerIcon className={classes.playerIcon} player={player} size={30} />
        <span className={classes.playerName}>{player.name}</span>
      </div>
      <div className={classes.right}>
        <span>{centsToPrice(player.totalEquity)}</span>
      </div>
    </Card>
  )
}

export default LeaderboardItem
