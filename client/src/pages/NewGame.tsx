import React, { FormEvent, useCallback, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useHistory } from 'react-router'
import Button from '../components/Button'
import PlayerColorInput from '../components/PlayerColorInput'
import PlayerAvatarInput from '../components/PlayerAvatarInput'
import RadioInput, { RadioInputOption } from '../components/RadioInput'
import TextInput from '../components/TextInput'
import { useNumberAsString } from '../hooks/useNumberAsString'
import { useCreateGame } from '../network/createGame'
import { buildUrl, routes } from '../routes'
import { Link } from 'react-router-dom'

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '32px',
    paddingBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
  },
  fieldset: {
    border: 'none',
  },
  goBack: {
    display: 'block',
    textAlign: 'center',
    padding: '10px',
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

export const NewGame = () => {
  const classes = useStyles()
  const history = useHistory()
  const [maxPlayers, setMaxPlayers] = useNumberAsString(8)
  const [numberOfStonks, setNumberOfStonks] = useNumberAsString(6)
  const [numberOfDays, setNumberOfDays] = useNumberAsString(5)
  const [nickname, setNickname] = useState('')
  const [playerColor, setPlayerColor] = useState('')
  const [playerAvatar, setPlayerAvatar] = useState('')

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
      playerColor,
      playerAvatar,
    }).then((game) => {
      history.push(buildUrl(routes.GAME, { id: game.id }))
    })
  }, [
    maxPlayers,
    numberOfDays,
    numberOfStonks,
    nickname,
    createGame,
    history,
    playerColor,
    playerAvatar,
  ])

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
        <PlayerColorInput value={playerColor} onChange={setPlayerColor} />
        <PlayerAvatarInput value={playerAvatar} onChange={setPlayerAvatar} />
        <Button
          fill="solid"
          size="lg"
          onClick={onStartGame}
          disabled={creatingGame || !nickname || !playerColor || !playerAvatar}
          type="button"
        >
          Start Game
        </Button>
        <Link to="/" className={classes.goBack}>
          Go Back
        </Link>
      </form>
    </div>
  )
}
