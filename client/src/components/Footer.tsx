import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(
  {
    root: {},
    list: {
      listStyleType: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& li': {
        marginRight: '20px',
        '& a': {
          textDecoration: 'none',
          fontSize: '10px',
        },
      },
    },
  },
  { name: 'Footer' },
)

export interface FooterProps {}
export const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        <li>
          <a href="/privacy_policy.html">privacy policy</a>
        </li>
        <li>
          <a href="/terms_of_use.html">terms of use</a>
        </li>
      </ul>
    </div>
  )
}

export default Footer
