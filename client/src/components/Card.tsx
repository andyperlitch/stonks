import React, { ReactNode } from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(
  {
    root: {
      background: 'rgba(255,255,255,0.07)',
      padding: '16px',
      borderRadius: '4px',
    },
  },
  { name: 'Card' },
)

export interface CardProps {
  children: ReactNode
  className?: string
}
export const Card = ({ children, className }: CardProps) => {
  const classes = useStyles()
  return <div className={cn(classes.root, className)}>{children}</div>
}

export default Card
