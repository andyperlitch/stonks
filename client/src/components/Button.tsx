import React, { ReactNode } from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

const useStyles = createUseStyles(
  {
    root: {
      color: 'white',
      cursor: 'pointer',
      outline: 'none',
      borderRadius: '3px',
    },
    solid: {
      border: 'none',
      background: 'var(--color-primary)',
      '& .disabled': {
        opacity: '0.5',
      },
    },
    outline: {
      border: '1px solid var(--color-primary)',
    },
    lg: {
      padding: '1em',
    },
    md: {},
    sm: {},
    xs: {},
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  { name: 'Button' },
)

export interface ButtonProps {
  children: ReactNode
  fill?: 'solid' | 'outline'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  onClick?: () => void
  disabled?: boolean
  type?: 'submit' | 'button' | 'link'
  className?: string
  href?: string
}
export const Button = ({
  children,
  fill = 'solid',
  size = 'lg',
  disabled,
  type = 'button',
  onClick,
  className,
  href,
}: ButtonProps) => {
  const classes = useStyles()
  if (type === 'link' || href) {
    return (
      <Link
        to={href || ''}
        className={cn(classes.root, classes[fill], classes[size], className)}
        onClick={disabled || !onClick ? () => {} : onClick}
      >
        {children}
      </Link>
    )
  }
  return (
    <button
      type={type}
      className={cn(
        classes.root,
        classes[fill],
        { disabled, [classes.disabled]: disabled },
        classes[size],
        className,
      )}
      disabled={disabled}
      onClick={disabled || !onClick ? () => {} : onClick}
    >
      {children}
    </button>
  )
}

export default Button
