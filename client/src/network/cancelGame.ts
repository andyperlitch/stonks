import { useState, useCallback } from 'react'
export const useCancelGame = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const cancelGame = useCallback(
    (gameId: string) => {
      setLoading(true)
      return fetch(`/api/games/${gameId}/cancel`, {
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
  return { cancelGame, loading, error }
}
