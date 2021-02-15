import { useState } from 'react'

export const useNumberAsString = (
  defaultValue: number,
): [number, (val: string) => void] => {
  const [value, setValue] = useState(defaultValue)
  return [value, (value: string) => setValue(parseFloat(value))]
}
