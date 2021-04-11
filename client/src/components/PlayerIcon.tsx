import React from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Player } from '../../types/game'
import { getAvatarUrl } from '../utils/getAvatarUrl'

const useStyles = createUseStyles(
  {
    root: {
      borderRadius: '50%',
      borderWidth: '2px',
      borderStyle: 'solid',
      backgroundSize: 'cover',
    },
  },
  { name: 'PlayerIcon' },
)

export interface PlayerIconProps {
  player: Player
  size: number
  className?: string
}
export const PlayerIcon = ({ player, size, className }: PlayerIconProps) => {
  const classes = useStyles()
  return (
    <div
      className={cn(classes.root, className)}
      style={{
        borderColor: player.color,
        backgroundImage: `url(${getAvatarUrl(player.avatar)})`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  )
}

export default PlayerIcon
