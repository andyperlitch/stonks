import React from 'react'
import { createUseStyles } from 'react-jss'
import { ToolbarPage } from './ToolbarPage'

const useStyles = createUseStyles({
  title: {
    textAlign: 'center',
  },
})

export const MyAvatar = () => {
  const classes = useStyles()
  return (
    <ToolbarPage>
      <h1 className={classes.title}>My Avatar</h1>
    </ToolbarPage>
  )
}
