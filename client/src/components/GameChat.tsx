import React, { FormEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { useGame } from '../hooks/useGame'
import Card from './Card'
import TextInput from './TextInput'
import useResizeObserver from 'use-resize-observer'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    chatMessages: {
      flexGrow: '1',
      overflowY: 'scroll',
    },
    chatMessage: {},
    from: {
      fontWeight: 'bold',
    },
    message: {},
    chatInput: {},
    submitBtn: {
      display: 'none',
    },
  },
  { name: 'GameChat' },
)

export interface GameChatProps {
  className?: string
}
export const GameChat = ({ className }: GameChatProps) => {
  const classes = useStyles()
  const { gameId, chat, socket } = useGame()
  const [draft, setDraft] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const { height } = useResizeObserver<HTMLDivElement>({ ref })

  const onMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!socket) {
      return
    }
    if (!draft.trim()) {
      return
    }
    socket.emit('chat', {
      gameId,
      message: draft,
    })
    setDraft('')
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [chat])

  return (
    <Card className={cn(classes.root, className)}>
      <div
        className={classes.chatMessages}
        ref={ref}
        style={{ height: height ? `${height}px` : 'auto' }}
      >
        {chat.map(({ message, nickname }) => {
          return (
            <div className={classes.chatMessage}>
              <span className={classes.from}>{nickname}: </span>
              <span className={classes.message}>{message}</span>
            </div>
          )
        })}
      </div>
      <form className={classes.chatInput} onSubmit={onMessage}>
        <TextInput name="draft_message" value={draft} onChange={setDraft} />
        <button type="submit" className={classes.submitBtn} />
      </form>
    </Card>
  )
}

export default GameChat
