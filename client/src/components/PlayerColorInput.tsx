import React from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import RadioInput, { RadioInputOption } from './RadioInput'
import { PLAYER_COLORS } from '../consts/playerColors'

const COLOR_OPTION_SIZE = 30
const COLOR_OPTION_PADDING = 8

const useStyles = createUseStyles(
  {
    choice: {
      height: `${COLOR_OPTION_SIZE}px`,
      width: `${COLOR_OPTION_SIZE}px`,
      borderRadius: '50%',
    },
    disabled: {},
    optionsContainer: {
      width: `${(COLOR_OPTION_SIZE + COLOR_OPTION_PADDING * 2 + 2) * 6}px`,
      flexWrap: 'wrap',
    },
    optionLabel: {
      padding: `${COLOR_OPTION_PADDING}px`,
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
  const COLOR_OPTIONS: RadioInputOption[] = PLAYER_COLORS.map((color) => ({
    value: color,
    label: (
      <div
        className={cn(classes.choice, {
          [classes.disabled]: taken.includes(color),
        })}
        style={{ backgroundColor: color }}
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
      name="playerColor"
      label="Your Color"
      value={value}
      onChange={onChange}
      options={COLOR_OPTIONS}
      optionIdPrefix="playerColor"
    />
  )
}

export default PlayerColorInput
