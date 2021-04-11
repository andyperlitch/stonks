import { useState, useCallback } from 'react'
import HttpJsonError from './HttpJsonError'
export const useJoinGame = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<HttpJsonError | null>(null)
  const joinGame = useCallback(
    ({
      nickname,
      code,
      playerColor,
      playerAvatar,
    }: {
      nickname: string
      code: string
      playerColor: string
      playerAvatar: string
    }) => {
      setLoading(true)
      return fetch(`/api/games/join`, {
        method: 'POST',
        body: JSON.stringify({ nickname, code, playerColor, playerAvatar }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status >= 400) {
            throw new HttpJsonError(
              data.status,
              data.code,
              data.message,
              data.more,
            )
          }
          return data
        })
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
