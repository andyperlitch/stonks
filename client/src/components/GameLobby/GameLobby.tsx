import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../../types/game'
import GameStonks from '../GameStonks'
import Nav from '../Nav'
import Portfolio from '../Portfolio'
import Leaderboard from '../Leaderboard'
import GameChat from '../GameChat'
import MainGrid from '../MainGrid'
import MarketInfoHeading from '../MarketInfoHeading'
import PregameMarketInfo from '../PregameMarketInfo'

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

  return (
    <MainGrid
      topBar={<Nav />}
      midLeft={
        <>
          <MarketInfoHeading game={game} nickname={nickname} />
          <PregameMarketInfo />
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
