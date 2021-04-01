import React from 'react'
import { useGame } from '../hooks/useGame'
import GameComplete from './GameComplete'
import GameError from './GameError'
import GameInProgress from './GameInProgress'
import GameLoading from './GameLoading'
import GameLobby from './GameLobby'

export const GameContainer = () => {
  const { loading, game, code, error, nickname } = useGame()

  if (!game) {
    if (loading || !error) {
      return <GameLoading />
    }
    return <GameError />
  }

  switch (game.status) {
    case 'NOT_STARTED': {
      return <GameLobby game={game} nickname={nickname as string} code={code} />
    }
    case 'IN_PROGRESS': {
      return <GameInProgress game={game} nickname={nickname as string} />
    }
    case 'COMPLETE':
    case 'CANCELLED': {
      console.log('boopp', game.status)
      return <GameInProgress game={game} nickname={nickname as string} />
    }
  }
}

export default GameContainer
