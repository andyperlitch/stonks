import React, { FormEvent, useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { createUseStyles } from 'react-jss'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { useJoinGame } from '../network/joinGame'
import { buildUrl, routes } from '../routes'
import FormErrors from '../components/FormErrors'
import PlayerColorInput from '../components/PlayerColorInput'
import PlayerAvatarInput from '../components/PlayerAvatarInput'

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
    margin: '20px auto 20px',
    textAlign: 'center',
  },
  joinInput: {
    textTransform: 'uppercase',
  },
})

export const JoinGame = () => {
  const classes = useStyles()
  const [nickname, setNickname] = useState('')
  const [playerColor, setPlayerColor] = useState('')
  const [playerAvatar, setPlayerAvatar] = useState('')
  const [code, setCode] = useState('')
  const history = useHistory()

  const { joinGame, error, loading } = useJoinGame()

  const onSubmit = useCallback(
    (e?: FormEvent) => {
      if (e) {
        e.preventDefault()
      }
      joinGame({ nickname, code, playerAvatar, playerColor })
        .then(({ id }) => {
          history.push(buildUrl(routes.GAME, { id }))
        })
        .catch((err) => {
          console.error('Error joining: ', err.message)
        })
    },
    [joinGame, code, history, nickname, playerAvatar, playerColor],
  )

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit}>
        <TextInput
          name="code"
          onChange={setCode}
          value={code}
          label="Enter passcode:"
          classes={{
            input: classes.joinInput,
          }}
        />
        <hr />
        <TextInput
          name="nickname"
          onChange={setNickname}
          value={nickname}
          label="Your Nickname"
        />
        <PlayerColorInput value={playerColor} onChange={setPlayerColor} />
        <PlayerAvatarInput value={playerAvatar} onChange={setPlayerAvatar} />
        <FormErrors error={error} />
        <Button
          type="submit"
          size="lg"
          onClick={onSubmit}
          disabled={Boolean(
            !code.trim() || !nickname.trim() || !playerAvatar || !playerColor,
          )}
        >
          Join Game
        </Button>
      </form>
    </div>
  )
}

export default JoinGame
