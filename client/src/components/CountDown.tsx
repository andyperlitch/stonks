import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'CountDown' },
)

const getTimeLeftString = (until: CountDownProps['until']): string => {
  let untilTS: number
  if (typeof until !== 'number') {
    untilTS = new Date(until).valueOf()
  } else {
    untilTS = until
  }
  const now = Date.now()

  let secondsUntil = Math.floor((untilTS - now) / 1000)
  let minutesUntil = Math.floor(secondsUntil / 60)
  secondsUntil %= 60
  return `${('00' + minutesUntil).slice(-2)}:${('00' + secondsUntil).slice(-2)}`
}

export interface CountDownProps {
  until: number | Date | string
}
export const CountDown = ({ until }: CountDownProps) => {
  const classes = useStyles()
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeftString(until))
    }, 1000)

    return () => clearTimeout(intervalId)
  }, [until])

  return <span className={classes.root}>{timeLeft}</span>
}

export default CountDown
