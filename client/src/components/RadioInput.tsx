import React, { ReactNode } from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'

export interface RadioInputOption {
  value: string
  label: ReactNode
  id?: string
}

export interface RadioInputProps {
  variant: 'compact' | 'stack'
  name: string
  value: string
  label?: ReactNode
  onChange: (val: string) => void
  optionIdPrefix: string
  options: RadioInputOption[]
  classes?: {
    fieldset?: string
    label?: string
    optionsContainer?: string
    input?: string
    error?: string
    optionLabel?: string
  }
}

const useCompactStyles = createUseStyles({
  fieldset: {
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1em',
    paddingLeft: '0',
    paddingRight: '0',
  },
  label: {
    marginBottom: '0.5em',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderLeft: '1px solid var(--color-primary)',
  },
  optionLabel: {
    display: 'block',
    padding: '0.5em 1em',
    border: '1px solid var(--color-primary)',
    borderLeft: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, 0.1)',
    },
  },
  selected: {
    backgroundColor: 'rgba(55,28,112,0.64)',
    '&:hover': {
      backgroundColor: 'rgba(55,28,112,0.64)',
    },
  },
  input: {
    display: 'none',
  },
  error: {},
})
const useStackStyles = createUseStyles({
  fieldset: {
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {},
  optionsContainer: {},
  optionLabel: {},
  selected: {},
  input: {},
  error: {},
})

const RadioInput = ({
  variant,
  name,
  value,
  label,
  onChange,
  options,
  optionIdPrefix,
  classes: userClasses = {},
}: RadioInputProps) => {
  const compactClasses = useCompactStyles()
  const stackClasses = useStackStyles()

  const classes = variant === 'compact' ? compactClasses : stackClasses

  return (
    <fieldset className={cn(classes.fieldset, userClasses.fieldset)}>
      {label && (
        <label className={cn(classes.label, userClasses.label)}>{label}</label>
      )}
      <div
        className={cn(classes.optionsContainer, userClasses.optionsContainer)}
      >
        {options.map((opt) => {
          const optId = `${optionIdPrefix}-${opt.id || opt.value}`
          return (
            <label
              key={optId}
              htmlFor={optId}
              className={cn(classes.optionLabel, userClasses.optionLabel, {
                [classes.selected]: value === opt.value,
              })}
            >
              {opt.label}
              <input
                className={cn(classes.input, userClasses.input)}
                type="radio"
                name={name}
                id={optId}
                checked={opt.value === value}
                value={opt.value}
                onChange={(e) => {
                  onChange((e.target as any).value)
                }}
              />
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
export default RadioInput
