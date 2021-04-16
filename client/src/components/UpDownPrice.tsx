import React, { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { centsToPrice } from '../utils/centsToPrice'
import MovingNumber from './MovingNumber'

const TIME_TO_REMOVE_CLASS = 300

const useStyles = createUseStyles(
  {
    root: {
      transition: 'color 0.2s',
    },
    goingUp: {
      color: '#48C949',
    },
    goingDown: {
      color: '#C94543',
    },
  },
  { name: 'UpDownPrice' },
)

export interface UpDownPriceProps {
  cents: number
}
export const UpDownPrice = ({ cents }: UpDownPriceProps) => {
  const classes = useStyles()

  const [lastValue, setLastValue] = useState(0)
  const [upDownClass, setUpDownClass] = useState<string | undefined>(undefined)
  const numString = useMemo(() => {
    const upDownClass = cents > lastValue ? classes.goingUp : classes.goingDown

    setLastValue(cents)
    setUpDownClass(upDownClass)

    return centsToPrice(cents)
  }, [cents])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setUpDownClass(undefined)
    }, TIME_TO_REMOVE_CLASS)

    return () => {
      clearTimeout(timerId)
    }
  }, [lastValue])
  return (
    <MovingNumber
      className={cn(upDownClass, classes.root)}
      numString={numString}
    />
  )
}

export default UpDownPrice
