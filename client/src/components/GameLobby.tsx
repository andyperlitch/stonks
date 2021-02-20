import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'
import Button from './Button'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      margin: '20px auto 0',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '600px',
      width: '100%',
    },
    sectionHeading: {
      marginTop: '20px',
    },
    players: {
      width: '100%',
    },
    player: {
      padding: '10px',
      border: '1px solid var(--color-primary)',
      marginTop: '10px',
      width: '100%',
    },
    stonks: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    stonk: {
      padding: '10px',
      border: '1px solid var(--color-primary)',
      marginTop: '10px',
      width: '33%',
    },
    codeBox: {
      border: '1px solid var(--color-secondary)',
      padding: '20px',
      marginBottom: '20px',
      textAlign: 'center',
    },
  },
  { name: 'GameLobby' },
)

export interface GameLobbyProps {
  /**
   * The game object itself
   */
  game: Game
  /**
   * The nickname of the current user
   */
  nickname: string
  /**
   * The entry code of the game (only available if the user is the owner)
   */
  code: string | null
  /**
   * The function to start the game
   */
  startGame: () => void
}
export const GameLobby = ({
  nickname,
  game,
  startGame,
  code,
}: GameLobbyProps) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {code && (
        <div className={classes.codeBox}>
          <h3>entry code:</h3>
          <h2>{code}</h2>
        </div>
      )}
      {game.owner === nickname ? (
        <Button fill="solid" size="lg" onClick={startGame}>
          Start Game
        </Button>
      ) : (
        <h1>Waiting to start...</h1>
      )}
      <h2 className={classes.sectionHeading}>Players</h2>
      <div className={classes.players}>
        {Object.values(game.players).map((player) => {
          return (
            <div key={player.name} className={classes.player}>
              <h3>{player.name}</h3>
            </div>
          )
        })}
      </div>
      <h2 className={classes.sectionHeading}>Stonks</h2>
      <div className={classes.stonks}>
        {Object.values(game.stonks).map((stonk) => {
          return (
            <div key={stonk.ticker} className={classes.stonk}>
              <h3>{stonk.ticker}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GameLobby
