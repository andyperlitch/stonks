import React from 'react'
import { createUseStyles } from 'react-jss'
import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonRouterLink,
} from '@ionic/react'
import {
  body,
  chevronBackOutline,
  eye,
  informationCircle,
  person,
  shirt,
  walk,
} from 'ionicons/icons'
import { ToolbarPage } from './ToolbarPage'
import { AvatarPreview } from '../components/AvatarPreview'
import { useFetchAvatars } from '../avatar/useFetchAvatars'
import { FetchAvatars_myAvatars } from '../avatar/types/FetchAvatars'
import { IonRouteComputedMatch } from '../types/ionic'

const useStyles = createUseStyles({
  title: {
    textAlign: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

interface EditAvatarProps {
  routeInfo: IonRouteComputedMatch
}

export const EditAvatar = ({ routeInfo }: EditAvatarProps) => {
  const avatarId = routeInfo.params?.avatarId

  const { error, loading, avatars } = useFetchAvatars()

  let avatar: FetchAvatars_myAvatars | undefined
  if (avatars && avatars.length) {
    avatar = avatars.find((a) => a.id === avatarId)
  }

  const classes = useStyles()
  return (
    <ToolbarPage>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonRouterLink routerDirection="back" routerLink="/avatars">
          <IonFabButton color="tertiary">
            <IonIcon icon={chevronBackOutline} />
          </IonFabButton>
        </IonRouterLink>
      </IonFab>
      <h1 className={classes.title}>Edit Avatar</h1>
      <nav className={classes.nav}>
        <IonButton color="light">
          <IonIcon slot="icon-only" icon={informationCircle} />
        </IonButton>
        <IonButton color="light">
          <IonIcon slot="icon-only" icon={body} />
        </IonButton>
        <IonButton color="light">
          <IonIcon slot="icon-only" icon={person} />
        </IonButton>
        <IonButton color="light">
          <IonIcon slot="icon-only" icon={eye} />
        </IonButton>
        <IonButton color="light">
          <IonIcon slot="icon-only" icon={shirt} />
        </IonButton>
        <IonButton color="light">
          <IonIcon slot="icon-only" icon={walk} />
        </IonButton>
      </nav>
      {avatar && <AvatarPreview multiplier={12} avatar={avatar} />}
    </ToolbarPage>
  )
}
