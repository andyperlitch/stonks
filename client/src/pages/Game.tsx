import React from 'react'
import { createUseStyles } from 'react-jss'
import { useParams } from 'react-router'
import GameLobby from '../components/GameLobby'
import { useGame } from '../network/useGame'

const useStyles = createUseStyles({
  root: {},
  error: {
    color: 'red',
  },
})

export const Game = () => {
  const classes = useStyles()
  const { id } = useParams<{ id: string }>()
  const { loading, game, code, error, nickname, socket } = useGame(id)
  const startGame = () => {
    console.log('start game!')
  }

  // TODO: better rendering for loading and error states
  if (loading || !game) {
    if (error) {
      return <div>error</div>
    }
    return <div>loading</div>
  }

  if (game.status === 'NOT_STARTED') {
    return (
      <GameLobby
        game={game}
        nickname={nickname as string}
        startGame={startGame}
        code={code}
      />
    )
  }

  return (
    <div className={classes.root}>
      {error && <p className={classes.error}>{error.message}</p>}
      game: <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  )
}

export default Game
