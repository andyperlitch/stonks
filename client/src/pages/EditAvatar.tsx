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

export const EditAvatar = () => {
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
    </ToolbarPage>
  )
}
