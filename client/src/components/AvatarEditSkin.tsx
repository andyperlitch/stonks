import React, { useCallback } from 'react'
import { IonItem, IonLabel, IonList, IonRange } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { Avatar } from '../pages/EditAvatar/types'
import { AvatarPreview } from './AvatarPreview'
import { avatarComponentChanged } from '../pages/EditAvatar/actions'
import useAvatarTemplate from '../avatar/useAvatarTemplate'
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
  color: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '2px solid white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
  colorChoices: {
    display: 'flex',
    flexDirection: 'row',
  },
})

const onChooseColor = (
  dispatch: any,
  type: string,
  componentChanges: { [attr: string]: any },
  optionId?: string,
) => () =>
  dispatch(
    avatarComponentChanged({
      type,
      optionId,
      ...componentChanges,
    }),
  )

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
  const type = 'skin'
  const classes = useStyles()
  const { skinColors } = useAvatarTemplate()
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

  return (
    <div className={classes.root}>
      <AvatarPreview avatar={avatar} multiplier={10} />
      <div className={classes.colorChoices}>
        {skinColors?.map((color) => {
          return (
            <div
              key={color.id}
              title={color.id}
              className={classes.color}
              onClick={onChooseColor(dispatch, type, color, optionId)}
              style={{ backgroundColor: color.previewColor }}
            ></div>
          )
        })}
      </div>

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
      <pre>{JSON.stringify(skinComponent, null, 2)}</pre>
    </div>
  )
}
