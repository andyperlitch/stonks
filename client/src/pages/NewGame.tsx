import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import RadioInput, { RadioInputOption } from '../components/RadioInput'
import TextInput from '../components/TextInput'
const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '32px',
  },
  fieldset: {
    border: 'none',
  },
})

const MAX_PLAYER_OPTIONS: RadioInputOption[] = [
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
]

const TICKER_OPTIONS: RadioInputOption[] = [
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
]

export const NewGame = () => {
  const classes = useStyles()
  const [gameName, setGameName] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('8')
  const [numStonks, setNumStonks] = useState('6')
  const [nickname, setNickname] = useState('')

  return (
    <div className={classes.container}>
      <h1>GAME GO BRRRRR</h1>
      <TextInput
        name="gameName"
        value={gameName}
        label="Game Name"
        onChange={setGameName}
      />
      <RadioInput
        variant="compact"
        name="maxPlayers"
        value={maxPlayers}
        label="Max # Players"
        onChange={setMaxPlayers}
        options={MAX_PLAYER_OPTIONS}
        optionIdPrefix="maxPlayers"
      />
      <RadioInput
        variant="compact"
        name="numStonks"
        value={numStonks}
        label="# of Stonks"
        onChange={setNumStonks}
        options={TICKER_OPTIONS}
        optionIdPrefix="numStonks"
      />
      <TextInput
        name="nickname"
        value={nickname}
        label="Your Nickname"
        onChange={setNickname}
      />
    </div>
  )
}
