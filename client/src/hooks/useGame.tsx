import { io, Socket } from 'socket.io-client'
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import { Game } from '../../types/game'

export interface GameContext {
  gameId: string | null
  loading?: boolean
  error: Error | null
  game: Game | null
  nickname: string | null
  code: string | null
  socket: Socket | null
}

const gameContext = createContext<GameContext>({
  gameId: null,
  loading: false,
  error: null,
  game: null,
  nickname: null,
  code: null,
  socket: null,
})

export const GameProvider = ({
  gameId,
  children,
}: {
  gameId: string
  children: ReactNode
}) => {
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
      console.log(`game:update`, data.game)
      if (data.id === gameId) {
        setGame(data.game)
      }
    })
    return { socket }
  }, [gameId, setGame])

  useEffect(() => {
    setGame(null)
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

  const value = useMemo(() => {
    return {
      gameId,
      loading,
      error,
      game,
      nickname,
      code,
      socket,
    }
  }, [loading, error, game, nickname, code, socket, gameId])

  return <gameContext.Provider value={value}>{children}</gameContext.Provider>
}

export const useGame = () => {
  return useContext(gameContext)
}
