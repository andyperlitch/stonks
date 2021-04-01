import React from 'react'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { createUseStyles } from 'react-jss'
import { Game } from '../../types/game'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/theme-dark.css'
import { useCancelGame } from '../network/cancelGame'

const useStyles = createUseStyles(
  {
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
  },
  { name: 'MarketInfoHeading' },
)

export interface MarketInfoHeadingProps {
  game: Game
  nickname: string
}
export const MarketInfoHeading = ({
  game,
  nickname,
}: MarketInfoHeadingProps) => {
  const classes = useStyles()
  const { cancelGame } = useCancelGame()
  return (
    <>
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
    </>
  )
}

export default MarketInfoHeading
