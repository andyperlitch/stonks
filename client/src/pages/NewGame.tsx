import { IonButton } from '@ionic/react'
import React, { useState } from 'react'
// import { useAsyncCallback } from 'react-async-hook'
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
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

const DAYS_OPTIONS: RadioInputOption[] = [
  { value: '5', label: '5' },
  { value: '7', label: '7' },
  { value: '10', label: '10' },
]

const useNumberAsStringState = (
  defaultValue: number,
): [number, (val: string) => void] => {
  const [value, setValue] = useState(defaultValue)
  return [value, (value: string) => setValue(parseFloat(value))]
}

export const NewGame = () => {
  const classes = useStyles()
  const [gameName, setGameName] = useState('')
  const [maxPlayers, setMaxPlayers] = useNumberAsStringState(8)
  const [numStonks, setNumStonks] = useNumberAsStringState(6)
  const [numberOfDays, setNumberOfDays] = useNumberAsStringState(5)
  const [nickname, setNickname] = useState('')

  // const onStartGame = useAsyncCallback()

  return (
    <div className={classes.container}>
      <form className={classes.form}>
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
          value={maxPlayers.toString()}
          label="Max # Players"
          onChange={setMaxPlayers}
          options={MAX_PLAYER_OPTIONS}
          optionIdPrefix="maxPlayers"
        />
        <RadioInput
          variant="compact"
          name="numStonks"
          value={numStonks.toString()}
          label="# of Stonks"
          onChange={setNumStonks}
          options={TICKER_OPTIONS}
          optionIdPrefix="numStonks"
        />
        <RadioInput
          variant="compact"
          name="numberOfDays"
          value={numberOfDays.toString()}
          label="# of Days (Rounds)"
          onChange={setNumberOfDays}
          options={DAYS_OPTIONS}
          optionIdPrefix="numberOfDays"
        />
        <TextInput
          name="nickname"
          value={nickname}
          label="Your Nickname"
          onChange={setNickname}
        />
        <IonButton fill="solid" size="large" onClick={onStartGame}>
          Start Game
        </IonButton>
      </form>
    </div>
  )
}
