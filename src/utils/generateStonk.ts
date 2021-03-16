import * as types from '../types/game'
import { Stonk } from './../model/Stonk'

const TICKER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function generateTicker() {
  const tickerLen = Math.ceil(Math.random() * 3)
  const letters: string[] = []
  for (let i = 0; i < tickerLen; i++) {
    letters.push(
      TICKER_LETTERS.charAt(Math.floor(Math.random() * TICKER_LETTERS.length)),
    )
  }
  return letters.join('')
}

export function generateStonk(): Stonk {
  const ticker = generateTicker()
  const stonk = new Stonk(ticker)
  return stonk
}

export function generateRounds(numberOfDays: number): types.Round[] {
  const rounds: types.Round[] = []

  for (let i = 0; i < numberOfDays; i++) {
    rounds.push(
      // market hours
      {
        id: i * 2,
        day: i + 1,
      },
      // after hours
      {
        id: i * 2 + 1,
        day: i + 1,
      },
    )
  }

  return rounds
}
