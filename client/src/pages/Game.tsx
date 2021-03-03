import React from 'react'
import { useParams } from 'react-router'
import { GameProvider } from '../hooks/useGame'
import GameContainer from '../components/GameContainer'

export const Game = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <GameProvider gameId={id}>
      <GameContainer />
    </GameProvider>
  )
}

export default Game
