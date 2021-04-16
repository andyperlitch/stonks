import React from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

const useStyles = createUseStyles(
  {
    root: {},
    homeLink: {
      textDecoration: 'none',
      color: 'white',
    },
  },
  { name: 'Nav' },
)

export const Nav = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>
        <Link className={classes.homeLink} to="/">
          🚀 StonksGame.xyz 🚀
        </Link>
      </h1>
    </div>
  )
}

export default Nav
