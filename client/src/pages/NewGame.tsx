import React, { FormEvent, useCallback, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useHistory } from 'react-router'
import Button from '../components/Button'
import RadioInput, { RadioInputOption } from '../components/RadioInput'
import TextInput from '../components/TextInput'
import { useNumberAsString } from '../hooks/useNumberAsString'
import { useCreateGame } from '../network/createGame'
import { buildUrl, routes } from '../routes'

const COLOR_OPTION_SIZE = 30
const COLOR_OPTION_PADDING = 8

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
  colorChoice: {
    height: `${COLOR_OPTION_SIZE}px`,
    width: `${COLOR_OPTION_SIZE}px`,
    borderRadius: '50%',
  },
  colorOptionsContainer: {
    width: `${(COLOR_OPTION_SIZE + COLOR_OPTION_PADDING * 2 + 2) * 6}px`,
    flexWrap: 'wrap',
  },
  colorOptionLabel: {
    padding: `${COLOR_OPTION_PADDING}px`,
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

const PLAYER_COLORS: string[] = [
  '#d13726', // red
  '#d6652d', // orange
  '#f1af00', // gold
  '#f7ed1e', // yellow
  '#83a630', // frog green
  '#38a630', // grass green
  '#30a68c', // teal
  '#1d8ecf', // steel blue
  '#462cc7', // indigo
  '#924ee6', // violet
  '#cf48e0', // pink
  '#fb12d8', // rose
]

export const NewGame = () => {
  const classes = useStyles()
  // need classes here, so this has to be in the component itself
  const COLOR_OPTIONS: RadioInputOption[] = PLAYER_COLORS.map((color) => ({
    value: color,
    label: (
      <div
        className={classes.colorChoice}
        style={{ backgroundColor: color }}
      ></div>
    ),
  }))
  const history = useHistory()
  const [maxPlayers, setMaxPlayers] = useNumberAsString(8)
  const [numberOfStonks, setNumberOfStonks] = useNumberAsString(6)
  const [numberOfDays, setNumberOfDays] = useNumberAsString(5)
  const [nickname, setNickname] = useState('')
  const [playerColor, setPlayerColor] = useState(COLOR_OPTIONS[0].value)

  const {
    createGame,
    loading: creatingGame,
    error: createError,
  } = useCreateGame()
  const onStartGame = useCallback(() => {
    createGame({
      maxPlayers,
      numberOfDays,
      numberOfStonks,
      nickname,
    }).then((game) => {
      history.push(buildUrl(routes.GAME, { id: game.id }))
    })
  }, [maxPlayers, numberOfDays, numberOfStonks, nickname, createGame, history])

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      onStartGame()
    },
    [onStartGame],
  )

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={onSubmit}>
        <h1>GAME GO BRRRRR</h1>
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
          name="numberOfStonks"
          value={numberOfStonks.toString()}
          label="# of Stonks"
          onChange={setNumberOfStonks}
          options={TICKER_OPTIONS}
          optionIdPrefix="numberOfStonks"
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
        <RadioInput
          classes={{
            optionsContainer: classes.colorOptionsContainer,
            optionLabel: classes.colorOptionLabel,
          }}
          variant="compact"
          name="playerColor"
          label="Your Color"
          value={playerColor}
          onChange={setPlayerColor}
          options={COLOR_OPTIONS}
          optionIdPrefix="playerColor"
        />
        <Button
          fill="solid"
          size="lg"
          onClick={onStartGame}
          disabled={creatingGame || !nickname}
          type="button"
        >
          Start Game
        </Button>
      </form>
    </div>
  )
}
