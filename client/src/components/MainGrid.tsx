import React, { ReactNode } from 'react'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { createUseStyles } from 'react-jss'

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
    midLeft: {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      gridRowStart: '2',
      gridRowEnd: '3',
      display: 'flex',
      flexDirection: 'column',
    },
    midCenter: {
      gridColumnStart: '2',
      gridColumnEnd: '3',
      gridRowStart: '2',
      gridRowEnd: '3',
      display: 'flex',
      flexDirection: 'column',
    },
    midRight: {
      gridColumnStart: '3',
      gridColumnEnd: '4',
      gridRowStart: '2',
      gridRowEnd: '3',
    },
    bottomLeft: {
      gridColumnStart: '1',
      gridColumnEnd: '3',
      gridRowStart: '3',
      gridRowEnd: '4',
    },
    bottomRight: {
      gridColumnStart: '3',
      gridColumnEnd: '4',
      gridRowStart: '3',
      gridRowEnd: '4',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { name: 'MainGrid' },
)

export interface MainGridProps {
  topBar: ReactNode
  midLeft: ReactNode
  midCenter: ReactNode
  midRight: ReactNode
  bottomLeft: ReactNode
  bottomRight: ReactNode
}
export const MainGrid = ({
  topBar,
  midLeft,
  midCenter,
  midRight,
  bottomLeft,
  bottomRight,
}: MainGridProps) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.topBar}>{topBar}</div>
      <div className={classes.midLeft}>{midLeft}</div>
      <div className={classes.midCenter}>{midCenter}</div>
      <div className={classes.midRight}>{midRight}</div>
      <div className={classes.bottomLeft}>{bottomLeft}</div>
      <div className={classes.bottomRight}>{bottomRight}</div>
    </div>
  )
}

export default MainGrid
