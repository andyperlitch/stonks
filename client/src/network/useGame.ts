import { io } from 'socket.io-client'
import { Game } from '../../types/game'
import { useState, useEffect, useMemo } from 'react'

export const useGame = (gameId: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [game, setGame] = useState<Game | null>(null)
  const [nickname, setNickname] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(null)

  const { socket } = useMemo(() => {
    const socket = io({})
    socket.on('connect', () => {
      console.log(`socket.id connected`, socket.id)
    })
    socket.on('disconnect', () => {
      console.log(`socket.id disconnected`, socket.id)
    })
    socket.on('game:update', (data: { game: Game; id: string }) => {
      console.log(`game:update`, data.game.players)
      if (data.id === gameId) {
        setGame(data.game)
      }
    })
    return { socket }
  }, [gameId, setGame])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/games/${gameId}`)
      .then((result) => {
        return result
      })
      .then((result) => result.json())
      .then(({ game, nickname, code }) => {
        setGame(game)
        setNickname(nickname)
        setCode(code)
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false)
      })
  }, [gameId])

  return {
    loading,
    error,
    game,
    nickname,
    code,
    socket,
  }
}
