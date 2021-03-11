import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'GameChat' },
)

export interface GameChatProps {
  game: Game
  nickname: string
}
export const GameChat = ({ game, nickname }: GameChatProps) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h2>Chat</h2>
    </div>
  )
}

export default GameChat
