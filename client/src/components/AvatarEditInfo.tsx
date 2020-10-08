import { IonInput, IonLabel } from '@ionic/react'
import React from 'react'
import { Avatar } from '../pages/EditAvatar/types'
export const AvatarEditInfo = ({
  avatar,
  dispatch,
}: {
  avatar: Avatar
  dispatch: any
}) => {
  console.log(`avatar`, avatar)

  const onNameChange = (e: any) => {
    console.log('e', e)
  }

  return (
    <div>
      <IonLabel position="floating">name</IonLabel>
      <IonInput value={avatar.name} onIonChange={onNameChange} />
    </div>
  )
}
