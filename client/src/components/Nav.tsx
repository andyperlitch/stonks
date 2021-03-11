import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'Nav' },
)

export const Nav = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>StonksGame.xyz</h1>
    </div>
  )
}

export default Nav
