import React, { FormEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { useGame } from '../hooks/useGame'
import Card from './Card'
import TextInput from './TextInput'
import useResizeObserver from 'use-resize-observer'

const MAX_MESSAGES_PER_PERIOD = 5
const MESSAGE_PERIOD = 5000

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    chatMessages: {
      flexGrow: '1',
      overflowY: 'scroll',
      position: 'relative',
    },
    chatMessage: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    from: {
      fontWeight: 'bold',
      flexShrink: '0',
    },
    message: {
      flexGrow: '1',
      margin: '0 10px',
    },
    messageTs: {
      marginRight: '10px',
      flexShrink: '0',
      flexGrow: '0',
    },
    chatInput: {},
    submitBtn: {
      display: 'none',
    },
    tooMany: {
      position: 'absolute',
      bottom: '-10px',
      color: '#EF9898',
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
  const [messageCountLeft, setMessageCountLeft] = useState(
    MAX_MESSAGES_PER_PERIOD,
  )

  const onMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!socket) {
      return
    }
    if (!draft.trim()) {
      return
    }
    if (messageCountLeft <= 0) {
      return
    }
    socket.emit('chat', {
      gameId,
      message: draft,
      ts: Date.now(),
    })
    setMessageCountLeft(messageCountLeft - 1)
    setDraft('')
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [chat])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageCountLeft(MAX_MESSAGES_PER_PERIOD)
    }, MESSAGE_PERIOD)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Card className={cn(classes.root, className)}>
      <div
        className={classes.chatMessages}
        ref={ref}
        style={{ height: height ? `${height}px` : 'auto' }}
      >
        {chat.map(({ message, nickname, ts }) => {
          return (
            <div key={`${nickname}:${ts}`} className={classes.chatMessage}>
              <span className={classes.from}>{nickname}: </span>
              <span className={classes.message}>{message}</span>
              <span className={classes.messageTs}>
                {new Date(ts).toLocaleTimeString()}
              </span>
            </div>
          )
        })}
      </div>
      {messageCountLeft === 0 && (
        <div className={classes.tooMany}>Too many messages...</div>
      )}
      <form className={classes.chatInput} onSubmit={onMessage}>
        <TextInput name="draft_message" value={draft} onChange={setDraft} />
        <button
          type="submit"
          disabled={messageCountLeft === 0}
          className={classes.submitBtn}
        />
      </form>
    </Card>
  )
}

export default GameChat
