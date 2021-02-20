import React, { useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router'
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
})

export const JoinGame = () => {
  const classes = useStyles()
  const [nickname, setNickname] = useState('')
  const [code, setCode] = useState('')
  const history = useHistory()

  const { joinGame, error, loading } = useJoinGame()

  const onSubmit = useCallback(() => {
    joinGame(nickname, code).then(({ id }) => {
      history.push(buildUrl(routes.GAME, { id }))
    })
  }, [joinGame, code, history, nickname])

  console.log(`code`, code)
  console.log(`nickname`, nickname)
  return (
    <div className={classes.container}>
      <form>
        <TextInput
          name="nickname"
          onChange={setNickname}
          value={nickname}
          label="Nickname:"
        />
        <TextInput
          name="code"
          onChange={setCode}
          value={code}
          label="Enter passcode:"
        />
        <Button
          type="button"
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
