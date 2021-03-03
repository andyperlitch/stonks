import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game } from '../../../types/game'
import GameBar from '../GameBar'
import GameStonks from '../GameStonks'
import PlayerStats from '../PlayerStats'

const SIDE_BAR_WIDTH = '30%'
const PLAYER_STATS_HEIGHT = '300px'
const TOP_BAR_HEIGHT = '60px'

const useStyles = createUseStyles(
  {
    root: {
      display: 'grid',
      gridTemplateColumns: `auto ${SIDE_BAR_WIDTH}`,
      gridTemplateRows: `${TOP_BAR_HEIGHT} auto ${PLAYER_STATS_HEIGHT}`,
      height: '100vh',
    },
    topBar: {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      gridRowStart: '1',
      gridRowEnd: '2',
    },
    mainArea: {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      gridRowStart: '2',
      gridRowEnd: '3',
    },
    bottomLeft: {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      gridRowStart: '3',
      gridRowEnd: '4',
    },
    rightBar: {
      gridColumnStart: '2',
      gridColumnEnd: '3',
      gridRowStart: '2',
      gridRowEnd: '4',
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
    <div className={classes.root}>
      <div className={classes.topBar}>
        <GameBar />
      </div>
      <div className={classes.mainArea}>
        <GameStonks />
      </div>
      <div className={classes.bottomLeft}>
        <PlayerStats nickname={nickname} game={game} />
      </div>
      <div className={classes.rightBar}>
        {/* <GameChat nickname={nickname} game={game} /> */}
      </div>
    </div>
  )
}

export default GameInProgress
