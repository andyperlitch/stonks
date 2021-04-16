import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'
import LeaderboardItem from './LeaderboardItem'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'Leaderboard' },
)

export interface LeaderboardProps {
  game: Game
}
export const Leaderboard = ({ game }: LeaderboardProps) => {
  const classes = useStyles()
  const players = game.players
  const playersInOrder = Object.keys(game.players)
    .sort((a, b) => {
      const aPlayer = players[a]
      const bPlayer = players[b]
      return bPlayer.totalEquity - aPlayer.totalEquity
    })
    .map((nickname) => players[nickname])

  return (
    <div className={classes.root}>
      {playersInOrder.map((player, i) => (
        <LeaderboardItem
          key={player.name}
          player={player}
          rank={i + 1}
          host={game.owner}
        />
      ))}
    </div>
  )
}

export default Leaderboard
