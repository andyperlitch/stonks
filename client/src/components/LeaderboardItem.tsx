import React from 'react'
import cn from 'classnames'
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
    winner: {
      backgroundColor: '#e1c62d',
      color: 'black',
      fontWeight: 'bolder',
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
  host: string
  winner?: boolean
}
export const LeaderboardItem = ({
  player,
  rank,
  host,
  winner = false,
}: LeaderboardItemProps) => {
  const classes = useStyles()
  return (
    <Card className={cn(classes.root, { [classes.winner]: winner })}>
      <div className={classes.left}>
        <span>{rank}.</span>
        <PlayerIcon className={classes.playerIcon} player={player} size={30} />
        <span className={classes.playerName}>{player.name}</span>
        {host === player.name ? '(host)' : null}
      </div>
      <div className={classes.right}>
        <span>{centsToPrice(player.totalEquity)}</span>
      </div>
    </Card>
  )
}

export default LeaderboardItem
