import React, { useCallback } from 'react'
import { IonItem, IonLabel, IonList, IonRange } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { Avatar } from '../pages/EditAvatar/types'
import { AvatarPreview } from './AvatarPreview'
import { avatarComponentChanged } from '../pages/EditAvatar/actions'
const useStyles = createUseStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  slider: {},
  sliderList: {
    width: '100%',
    maxWidth: '300px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const onComponentChange = (
  dispatch: any,
  type: string,
  attr: 'saturation' | 'lightness' | 'contrast' | 'hue',
  optionId?: string,
) => (e: any) =>
  dispatch(
    avatarComponentChanged({
      type,
      optionId,
      [attr]: e.detail.value,
    }),
  )

export const AvatarEditSkin = ({
  avatar,
  dispatch,
}: {
  avatar: Avatar
  dispatch: any
}) => {
  const type = 'hair'
  const classes = useStyles()
  const skinComponent = avatar.components.find((c) => c.type === type)
  const optionId = skinComponent?.optionId
  const onSaturationChange = useCallback(
    onComponentChange(dispatch, type, 'saturation', optionId),
    [dispatch, optionId],
  )
  const onLightnessChange = useCallback(
    onComponentChange(dispatch, type, 'lightness', optionId),
    [dispatch, optionId],
  )
  const onHueChange = useCallback(
    onComponentChange(dispatch, type, 'hue', optionId),
    [dispatch, optionId],
  )
  const onContrastChange = useCallback(
    onComponentChange(dispatch, type, 'contrast', optionId),
    [dispatch, optionId],
  )
  // hue: getRandomInteger([-180, 180]),
  // saturation: getRandomInteger([0, 200]),
  // lightness: getRandomInteger([0, 200]),
  // contrast: getRandomInteger([0, 200]),
  console.log(`avatar`, avatar)
  return (
    <div className={classes.root}>
      <AvatarPreview avatar={avatar} multiplier={10} />

      <IonList className={classes.sliderList}>
        <IonItem className={classes.item}>
          <IonLabel>Hue</IonLabel>
          <IonRange
            className={classes.slider}
            onIonChange={onHueChange}
            value={skinComponent?.hue}
            min={-180}
            max={180}
          />
        </IonItem>
        <IonItem className={classes.item}>
          <IonLabel>Saturation</IonLabel>
          <IonRange
            className={classes.slider}
            onIonChange={onSaturationChange}
            value={skinComponent?.saturation}
            min={0}
            max={200}
          />
        </IonItem>
        <IonItem className={classes.item}>
          <IonLabel>Lightness</IonLabel>
          <IonRange
            className={classes.slider}
            onIonChange={onLightnessChange}
            value={skinComponent?.lightness}
            min={0}
            max={200}
          />
        </IonItem>
        <IonItem className={classes.item}>
          <IonLabel>Contrast</IonLabel>
          <IonRange
            className={classes.slider}
            onIonChange={onContrastChange}
            value={skinComponent?.contrast}
            min={0}
            max={200}
          />
        </IonItem>
      </IonList>
    </div>
  )
}
