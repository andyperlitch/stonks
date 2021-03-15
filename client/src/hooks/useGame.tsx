import { io, Socket } from 'socket.io-client'
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import * as types from '../../types/game'

interface ChatMessage {
  nickname: string
  message: string
}
export interface GameContext {
  gameId: string | null
  loading?: boolean
  error: Error | null
  game: types.Game | null
  nickname: string | null
  code: string | null
  socket: Socket | null
  chat: ChatMessage[]
  history: types.GameHistoricalPoint[]
}

const gameContext = createContext<GameContext>({
  gameId: null,
  loading: false,
  error: null,
  game: null,
  nickname: null,
  code: null,
  socket: null,
  chat: [],
  history: [],
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
  const [game, setGame] = useState<types.Game | null>(null)
  const [history, setHistory] = useState<types.GameHistoricalPoint[]>([])
  const [nickname, setNickname] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(null)
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)

  // obtain the socket
  useEffect(() => {
    const _socket = io({})
    _socket.on('connect', () => {
      console.log(`socket.id connected`, _socket.id)
    })
    _socket.on('disconnect', () => {
      console.log(`socket.id disconnected`, _socket.id)
    })
    setSocket(_socket)

    return () => {
      _socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket) {
      return () => {}
    }
    const handleGameUpdate = ({
      game,
      id,
      ts,
    }: {
      game: types.Game
      id: string
      ts: number
    }) => {
      // console.log(`game:update`, game)
      if (id === gameId) {
        setGame(game)
      }
      const historicalPoint: types.GameHistoricalPoint = {
        ts,
        players: Object.values(game.players).reduce((acc, player) => {
          acc[player.name] = player
          return acc
        }, {} as types.PlayersHistoryPoint),
        stonks: Object.values(game.stonks).reduce((acc, stonk) => {
          acc[stonk.ticker] = stonk
          return acc
        }, {} as types.StonksHistoryPoint),
      }
      setHistory(history.concat(historicalPoint))
    }
    const handleChat = (data: {
      id: string
      message: string
      nickname: string
    }) => {
      console.log(`game:chat`, data.message, chat)
      const newChat = chat.concat({
        nickname: data.nickname,
        message: data.message,
      })
      setChat(newChat)
    }
    socket.on('game:update', handleGameUpdate)
    socket.on('game:chat', handleChat)
    return () => {
      socket.off('game:update', handleGameUpdate)
      socket.off('game:chat', handleChat)
    }
  }, [gameId, setGame, setChat, chat, socket, history])

  useEffect(() => {
    setGame(null)
    setLoading(true)
    fetch(`/api/games/${gameId}`)
      .then((result) => {
        return result
      })
      .then((result) => result.json())
      .then(({ game, nickname, code, history }) => {
        setGame(game)
        setNickname(nickname)
        setCode(code)
        setHistory(history)
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
      chat,
      history,
    }
  }, [loading, error, game, nickname, code, socket, gameId, chat, history])

  return <gameContext.Provider value={value}>{children}</gameContext.Provider>
}

export const useGame = () => {
  return useContext(gameContext)
}
