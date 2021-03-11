import React, { FormEvent, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'
import { useGame } from '../hooks/useGame'
import TextInput from './TextInput'

const useStyles = createUseStyles(
  {
    root: {},
    chatWindow: {
      display: 'flex',
      flexDirection: 'column',
    },
    chatMessages: {},
    chatMessage: {},
    from: {},
    message: {},
    chatInput: {},
    submitBtn: {
      display: 'none',
    },
  },
  { name: 'GameChat' },
)

export interface GameChatProps {
  game: Game
  nickname: string
}
export const GameChat = ({ game, nickname }: GameChatProps) => {
  const classes = useStyles()
  const { gameId, chat, socket } = useGame()
  const [draft, setDraft] = useState('')

  const onMessage = (e: FormEvent<HTMLFormElement>) => {
    console.log('testing')
    e.preventDefault()
    if (!socket) {
      return
    }
    socket.emit('chat', {
      gameId,
      message: draft,
    })
    setDraft('')
  }

  return (
    <div className={classes.root}>
      <h2>Chat</h2>
      <div className={classes.chatWindow}>
        <div className={classes.chatMessages}>
          {chat.map(({ message, nickname }) => {
            return (
              <div className={classes.chatMessage}>
                <div className={classes.from}>{nickname}: </div>
                <div className={classes.message}>{message}</div>
              </div>
            )
          })}
        </div>
        <form className={classes.chatInput} onSubmit={onMessage}>
          <TextInput name="draft_message" value={draft} onChange={setDraft} />
          <button type="submit" className={classes.submitBtn} />
        </form>
      </div>
    </div>
  )
}

export default GameChat
