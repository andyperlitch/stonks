import { useState, useCallback } from 'react'
export const useStartGame = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const startGame = useCallback(
    (gameId: string) => {
      setLoading(true)
      return fetch(`/api/games/${gameId}/start`, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false)
          return data as { id: string }
        })
        .catch((err) => {
          setLoading(false)
          setError(err)
          throw err
        })
    },
    [setLoading, setError],
  )
  return { startGame, loading, error }
}
