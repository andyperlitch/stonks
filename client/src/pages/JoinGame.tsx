import React, { FormEvent, useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { createUseStyles } from 'react-jss'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { useJoinGame } from '../network/joinGame'
import { buildUrl, routes } from '../routes'

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
    margin: '20px auto 0',
    textAlign: 'center',
  },
  joinInput: {
    textTransform: 'uppercase',
  },
})

export const JoinGame = () => {
  const classes = useStyles()
  const [nickname, setNickname] = useState('')
  const [code, setCode] = useState('')
  const history = useHistory()

  const { joinGame, error, loading } = useJoinGame()

  const onSubmit = useCallback(
    (e?: FormEvent) => {
      if (e) {
        e.preventDefault()
      }
      joinGame(nickname, code).then(({ id }) => {
        history.push(buildUrl(routes.GAME, { id }))
      })
    },
    [joinGame, code, history, nickname],
  )

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit}>
        <TextInput
          name="nickname"
          onChange={setNickname}
          value={nickname}
          label="Nickname:"
          classes={{
            input: classes.joinInput,
          }}
        />
        <TextInput
          name="code"
          onChange={setCode}
          value={code}
          label="Enter passcode:"
        />
        <Button
          type="submit"
          size="lg"
          onClick={onSubmit}
          disabled={Boolean(!code.trim() || !nickname.trim())}
        >
          Join Game
        </Button>
      </form>
    </div>
  )
}

export default JoinGame
