import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import Button from './Button'
import Card from './Card'
import { useStartGame } from '../network/startGame'
import { useGame } from '../hooks/useGame'
import DonutTimer from './DonutTimer'

const START_DELAY = 3 * 1000
// const START_DELAY = 5 * 1000

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    codeBox: {
      background: 'var(--color-secondary)',
      color: 'black',
      padding: '20px',
      textAlign: 'center',
      width: '200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '10px',
    },
    code: {
      fontWeight: 'bold',
    },
    loadingRocket: {},
    startGameBtnContainer: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    startError: {
      color: 'red',
    },
    waitingText: {
      marginTop: '20px',
      fontSize: '14px',
      textAlign: 'center',
      textDecoration: 'none',
    },
  },
  { name: 'PregameMarketInfo' },
)

export interface PregameMarketInfoProps {
  className?: string
}
export const PregameMarketInfo = ({ className }: PregameMarketInfoProps) => {
  const classes = useStyles()

  const { game, nickname, socket, code } = useGame()
  const [startTimer, setStartTimer] = useState<any>(null)
  const { startGame, loading: startingGame, error: startError } = useStartGame()
  const [starting, setStarting] = useState<number | null>(null)
  const onStartGame = () => {
    if (!socket || !game) {
      return
    }
    socket.emit('starting', {
      gameId: game.id,
      startTime: Date.now() + START_DELAY,
    })
    const timer = setTimeout(() => {
      startGame(game.id)
    }, START_DELAY)
    setStartTimer(timer)
  }
  const cancelStart = () => {
    if (!socket || !game) {
      return
    }
    clearTimeout(startTimer)
    socket.emit('cancelStart', {
      gameId: game.id,
    })
  }

  useEffect(() => {
    if (!socket) {
      return
    }
    const handleStartingEvent = ({ id, startTime }) => {
      if (game && id === game.id) {
        setStarting(startTime)
      }
    }
    socket.on('game:starting', handleStartingEvent)
    const handleCancelStart = ({ id }) => {
      if (game && id === game.id) {
        setStarting(null)
      }
    }
    socket.on('game:cancelStart', handleCancelStart)
    return () => {
      socket.off('starting', handleStartingEvent)
      socket.off('cancelStart', handleCancelStart)
    }
  }, [socket])

  if (!game) {
    return (
      <Card className={cn(classes.root, className)}>
        <div className={classes.loadingRocket}>🚀</div>
      </Card>
    )
  }

  return (
    <Card className={cn(classes.root, className)}>
      {typeof starting === 'number' ? (
        <DonutTimer
          start={new Date()}
          end={new Date(starting)}
          fg="#e1c62d"
          bg="rgba(0,0,0,0.2)"
          outerRadius={60}
          innerRadius={30}
        />
      ) : (
        <div className={classes.codeBox}>
          <h3>entry code:</h3>
          <h2 className={classes.code}>{code}</h2>
        </div>
      )}
      {game.owner === nickname ? (
        <div className={classes.startGameBtnContainer}>
          {typeof starting === 'number' ? (
            <Button
              fill="solid"
              size="lg"
              onClick={cancelStart}
              disabled={startingGame}
            >
              Cancel Start
            </Button>
          ) : (
            <Button
              fill="solid"
              size="lg"
              onClick={onStartGame}
              disabled={startingGame}
            >
              Start Game
            </Button>
          )}
          {startError && (
            <p className={classes.startError}>
              {JSON.stringify(startError, null, 2)}
            </p>
          )}
        </div>
      ) : (
        <h3 className={classes.waitingText}>
          {typeof starting === 'number'
            ? 'Game starting. Get ready!'
            : 'Waiting for host to start game...'}
        </h3>
      )}
    </Card>
  )
}

export default PregameMarketInfo
