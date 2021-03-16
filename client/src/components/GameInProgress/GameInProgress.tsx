import React from 'react'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { createUseStyles } from 'react-jss'
import { Game } from '../../../types/game'
import GameStonks from '../GameStonks'
import MarketInfo from '../MarketInfo'
import Nav from '../Nav'
import Portfolio from '../Portfolio'
import Leaderboard from '../Leaderboard'
import GameChat from '../GameChat'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/theme-dark.css'
import { useCancelGame } from '../../network/cancelGame'

const LEFT_SIDE_BAR_WIDTH = '20%'
const RIGHT_SIDE_BAR_WIDTH = '30%'
const SECOND_ROW_HEIGHT = '300px'
const TOP_BAR_HEIGHT = '60px'

const useStyles = createUseStyles(
  {
    root: {
      display: 'grid',
      gridTemplateColumns: `${LEFT_SIDE_BAR_WIDTH} auto ${RIGHT_SIDE_BAR_WIDTH}`,
      gridTemplateRows: `${TOP_BAR_HEIGHT} ${SECOND_ROW_HEIGHT} auto`,
      minHeight: '100vh',
      '& > *': {
        padding: '16px',
      },
    },
    topBar: {
      gridColumnStart: '1',
      gridColumnEnd: '3',
      gridRowStart: '1',
      gridRowEnd: '2',
    },
    marketInfoHeading: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    controlMenuBtn: {
      fontSize: '15px',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      textAlign: 'center',
      borderRadius: '4px',
      border: 'none',
      padding: '0.4rem',
      '&:hover': {
        backgroundColor: 'rgb(32.3%, 9.1%, 53%)',
      },
    },
    controlMenu: {
      fontSize: '11px',
      padding: '0.25rem',
      background: 'rgb(28.5%, 17.3%, 38.6%)',
      color: 'white',
      '& .rc-menu__item--hover': {
        backgroundColor: 'rgb(31.5%, 10.1%, 50.7%)',
      },
    },
    marketInfo: {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      gridRowStart: '2',
      gridRowEnd: '3',
      display: 'flex',
      flexDirection: 'column',
    },
    portfolio: {
      gridColumnStart: '2',
      gridColumnEnd: '3',
      gridRowStart: '2',
      gridRowEnd: '3',
      display: 'flex',
      flexDirection: 'column',
    },
    leaderboard: {
      gridColumnStart: '3',
      gridColumnEnd: '4',
      gridRowStart: '2',
      gridRowEnd: '3',
    },
    stonks: {
      gridColumnStart: '1',
      gridColumnEnd: '3',
      gridRowStart: '3',
      gridRowEnd: '4',
    },
    chat: {
      gridColumnStart: '3',
      gridColumnEnd: '4',
      gridRowStart: '3',
      gridRowEnd: '4',
      display: 'flex',
      flexDirection: 'column',
    },
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
  const { cancelGame } = useCancelGame()
  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Nav />
      </div>
      <div className={classes.marketInfo}>
        <h2 className={classes.marketInfoHeading}>
          <span>Market Info</span>
          <span>
            {nickname === game.owner && (
              <Menu
                className={classes.controlMenu}
                menuButton={
                  <MenuButton className={classes.controlMenuBtn}>⚙️</MenuButton>
                }
              >
                <MenuItem onClick={() => cancelGame(game.id) as any}>
                  End this game
                </MenuItem>
              </Menu>
            )}
          </span>
        </h2>
        <MarketInfo className={classes.marketInfoCard} game={game} />
      </div>
      <div className={classes.portfolio}>
        <h2>Your Portfolio</h2>
        <Portfolio
          className={classes.portfolioCard}
          game={game}
          nickname={nickname}
        />
      </div>
      <div className={classes.leaderboard}>
        <h2>Leaderboard</h2>
        <Leaderboard game={game} />
      </div>
      <div className={classes.chat}>
        <h2>Chat</h2>
        <GameChat className={classes.chatCard} />
      </div>
      <div className={classes.stonks}>
        <h2>Stonks</h2>
        <GameStonks />
      </div>
    </div>
  )
}

export default GameInProgress
