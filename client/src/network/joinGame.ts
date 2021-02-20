import { useState, useCallback } from 'react'
export const useJoinGame = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const joinGame = useCallback(
    (nickname: string, code: string) => {
      setLoading(true)
      return fetch(`/api/games/join`, {
        method: 'POST',
        body: JSON.stringify({ nickname, code }),
        headers: {
          'Content-Type': 'application/json',
        },
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
  return { joinGame, loading, error }
}
