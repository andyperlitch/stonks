import React, { ReactNode, useCallback } from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'

export interface TextInputProps {
  onChange: (value: string) => void
  value: string
  name: string
  label?: ReactNode
  error?: string
  classes?: {
    fieldset?: string
    label?: string
    input?: string
  }
  minLength?: number
  maxLength?: number
}

const useStyles = createUseStyles({
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
  input: {
    fontFamily: "'Courier New'",
    padding: '0.7em',
    border: '1px solid var(--color-primary)',
    background: 'rgba(0,0,0,0.1)',
    flexGrow: '1',
    color: 'white',
  },
})

const TextInput = React.memo(
  ({
    onChange,
    value,
    label,
    error,
    classes = {},
    name,
    maxLength = undefined,
    minLength = undefined,
  }: TextInputProps) => {
    const defaultClasses = useStyles()

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
      },
      [onChange],
    )

    return (
      <fieldset className={cn(defaultClasses.fieldset, classes.fieldset)}>
        {label && (
          <label
            className={cn(defaultClasses.label, classes.label)}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <input
          className={cn(defaultClasses.input, classes.input)}
          type="text"
          name={name}
          onChange={handleChange}
          value={value}
          autoComplete="off"
          maxLength={maxLength}
          minLength={minLength}
        />
      </fieldset>
    )
  },
)

export default TextInput
