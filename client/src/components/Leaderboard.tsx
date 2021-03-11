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
      return aPlayer.totalEquity - bPlayer.totalEquity
    })
    .map((nickname) => players[nickname])

  return (
    <div className={classes.root}>
      <h2>Leaderboard</h2>
      {playersInOrder.map((player, i) => (
        <LeaderboardItem player={player} rank={i + 1} />
      ))}
    </div>
  )
}

export default Leaderboard
