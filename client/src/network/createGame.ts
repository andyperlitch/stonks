import { useState, useCallback } from 'react'
export const useCreateGame = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const createGame = useCallback(
    (options: {
      maxPlayers: number
      numberOfDays: number
      numberOfStonks: number
      nickname: string
      playerColor: string
      playerAvatar: string
    }) => {
      setLoading(true)
      return fetch('/api/games', {
        method: 'POST',
        body: JSON.stringify(options),
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
          return Promise.reject(err)
        })
    },
    [setLoading, setError],
  )
  return { createGame, loading, error }
}
