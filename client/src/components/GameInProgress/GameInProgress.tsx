import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../../types/game'
import GameStonks from '../GameStonks'
import MarketInfo from '../MarketInfo'
import Nav from '../Nav'
import Portfolio from '../Portfolio'
import Leaderboard from '../Leaderboard'
import GameChat from '../GameChat'
import MainGrid from '../MainGrid'
import MarketInfoHeading from '../MarketInfoHeading'

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
  { name: 'GameInProgress' },
)

export interface GameInProgressProps {
  game: Game
  nickname: string
}
export const GameInProgress = ({ game, nickname }: GameInProgressProps) => {
  const classes = useStyles()
  return (
    <MainGrid
      topBar={<Nav />}
      midLeft={
        <>
          <MarketInfoHeading game={game} nickname={nickname} />
          <MarketInfo className={classes.marketInfoCard} game={game} />
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
          <h2>Leaderboard</h2>
          <Leaderboard game={game} />
        </>
      }
      bottomLeft={
        <>
          <h2>Stonks</h2>
          <GameStonks />
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

export default GameInProgress
