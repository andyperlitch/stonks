import React from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import RadioInput, { RadioInputOption } from './RadioInput'
import { PLAYER_AVATARS } from '../consts/playerAvatars'
import { getAvatarUrl } from '../utils/getAvatarUrl'

const AVATAR_OPTION_SIZE = 40
const AVATAR_OPTION_PADDING = 8
const AVATARS_PER_ROW = 5

const useStyles = createUseStyles(
  {
    choice: {
      backgroundSize: 'contain',
      height: `${AVATAR_OPTION_SIZE}px`,
      width: `${AVATAR_OPTION_SIZE}px`,
      borderRadius: '50%',
    },
    disabled: {},
    optionsContainer: {
      width: `${
        (AVATAR_OPTION_SIZE + AVATAR_OPTION_PADDING * 2 + 2) * AVATARS_PER_ROW
      }px`,
      flexWrap: 'wrap',
    },
    optionLabel: {
      padding: `${AVATAR_OPTION_PADDING}px`,
    },
  },
  { name: 'PlayerColorInput' },
)

export interface PlayerColorInputProps {
  value?: string
  onChange: (val: string) => void
  taken?: string[]
}
export const PlayerColorInput = ({
  value,
  onChange,
  taken = [],
}: PlayerColorInputProps) => {
  const classes = useStyles()
  const AVATAR_OPTIONS: RadioInputOption[] = PLAYER_AVATARS.map((avatar) => ({
    value: avatar,
    label: (
      <div
        className={cn(classes.choice, {
          [classes.disabled]: taken.includes(avatar),
        })}
        style={{ backgroundImage: `url(${getAvatarUrl(avatar)})` }}
      ></div>
    ),
  }))
  return (
    <RadioInput
      classes={{
        optionsContainer: classes.optionsContainer,
        optionLabel: classes.optionLabel,
      }}
      variant="compact"
      name="playerAvatar"
      label="Your Avatar"
      value={value}
      onChange={onChange}
      options={AVATAR_OPTIONS}
      optionIdPrefix="playerColor"
    />
  )
}

export default PlayerColorInput
