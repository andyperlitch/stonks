import { Game } from '../../types/game'
import { useState, useEffect } from 'react'

export const useGame = (gameId: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [game, setGame] = useState<Game | null>(null)
  const [nickname, setNickname] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/games/${gameId}`)
      .then((result) => {
        console.log('result', result)
        return result
      })
      .then((result) => result.json())
      .then(({ game, nickname }) => {
        setGame(game)
        setNickname(nickname)
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
  }
}
