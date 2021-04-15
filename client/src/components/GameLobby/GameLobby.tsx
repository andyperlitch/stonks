import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../../types/game'
import Button from '../Button'
import GameStonks from '../GameStonks'
import Nav from '../Nav'
import Portfolio from '../Portfolio'
import Leaderboard from '../Leaderboard'
import GameChat from '../GameChat'
import MainGrid from '../MainGrid'
import MarketInfoHeading from '../MarketInfoHeading'
import { useStartGame } from '../../network/startGame'
import Card from '../Card'

const useStyles = createUseStyles(
  {
    marketInfoCard: {
      flexGrow: '1',
    },
    portfolioCard: {
      flexGrow: '1',
    },
    chatCard: {
      flexGrow: '1',
    },
    codeBox: {
      background: 'var(--color-secondary)',
      color: 'black',
      padding: '20px',
      marginBottom: '20px',
      textAlign: 'center',
      width: '200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '10px',
    },
    code: {
      fontWeight: 'bold',
    },

    startError: {
      color: 'red',
    },
    startGameBtnContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
}
export const GameLobby = ({ game, nickname, code }: GameLobbyProps) => {
  const classes = useStyles()
  const { startGame, loading: startingGame, error: startError } = useStartGame()
  const onStartGame = () => {
    startGame(game.id)
  }
  return (
    <MainGrid
      topBar={<Nav />}
      midLeft={
        <>
          <MarketInfoHeading game={game} nickname={nickname} />
          <Card className={classes.marketInfoCard}>
            {code && (
              <div className={classes.codeBox}>
                <h3>entry code:</h3>
                <h2 className={classes.code}>{code}</h2>
              </div>
            )}
            {game.owner === nickname ? (
              <div className={classes.startGameBtnContainer}>
                <Button
                  fill="solid"
                  size="lg"
                  onClick={onStartGame}
                  disabled={startingGame}
                >
                  Start Game
                </Button>
                {startError && (
                  <p className={classes.startError}>
                    {JSON.stringify(startError, null, 2)}
                  </p>
                )}
              </div>
            ) : (
              <h1>Waiting to start...</h1>
            )}
          </Card>
        </>
      }
      midCenter={
        <>
          <h2>Your Portfolio</h2>
          <Portfolio className={classes.portfolioCard} />
        </>
      }
      midRight={
        <>
          <h2>Players</h2>
          <Leaderboard game={game} />
        </>
      }
      bottomLeft={
        <>
          <h2>Stonks</h2>
          <GameStonks pregame />
        </>
      }
      bottomRight={
        <>
          <h2>Chat</h2>
          <GameChat className={classes.chatCard} />
        </>
      }
    />
  )
}

export default GameLobby
