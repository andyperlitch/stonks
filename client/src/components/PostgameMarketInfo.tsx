import React from 'react'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import Card from './Card'
import { useGame } from '../hooks/useGame'
import PlayerIcon from './PlayerIcon'
import { getLeader } from '../utils/getLeader'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dead: {
      fontSize: '80px',
    },
    heading: {
      textAlign: 'center',
    },
  },
  { name: 'PostgameMarketInfo' },
)

export interface PostgameMarketInfoProps {
  className?: string
}
export const PostgameMarketInfo = ({ className }: PostgameMarketInfoProps) => {
  const classes = useStyles()
  const { game } = useGame()

  if (!game) {
    return null
  }

  const winner = getLeader(game)

  return (
    <Card className={cn(classes.root, className)}>
      {game.status === 'CANCELLED' ? (
        <>
          <span className={classes.dead}>😵</span>
          <h2 className={classes.heading}>Game was cancelled by the host!</h2>
        </>
      ) : (
        <>
          <h3>and the winner is...</h3>
          <PlayerIcon player={winner} size={100} />
          <h2 className={classes.heading}>{winner.name}!</h2>
          <p>(congrats and fuck you)</p>
        </>
      )}
    </Card>
  )
}

export default PostgameMarketInfo
