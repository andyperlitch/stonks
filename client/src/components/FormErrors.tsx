import React from 'react'
import { createUseStyles } from 'react-jss'
import HttpJsonError from '../network/HttpJsonError'

const useStyles = createUseStyles(
  {
    error: {
      padding: '1rem',
      background: '#CC3311',
      color: 'white',
      border: '1px solid white',
      marginBottom: '1rem',
    },
  },
  { name: 'FormErrors' },
)

export interface FormErrorsProps {
  error?: HttpJsonError | null
}
export const FormErrors = ({ error }: FormErrorsProps) => {
  const classes = useStyles()
  return error ? (
    <p className={classes.error} title={error.code}>
      {error.message}
    </p>
  ) : null
}

export default FormErrors
