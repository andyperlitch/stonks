import React, { useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLoading,
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
import { ToolbarPage } from '../ToolbarPage'
import { useFetchAvatars } from '../../avatar/useFetchAvatars'
import { routes, buildUrl } from '../../routes'

import { AvatarEditInfo } from '../../components/AvatarEditInfo'
import { AvatarEditSkin } from '../../components/AvatarEditSkin'
import { AvatarEditHair } from '../../components/AvatarEditHair'
import { AvatarEditEyes } from '../../components/AvatarEditEyes'
import { AvatarEditTop } from '../../components/AvatarEditTop'
import { AvatarEditBottom } from '../../components/AvatarEditBottom'
import { Avatar } from './types'
import { editAvatarReducer, EditAvatarReducer } from './reducer'
import { avatarLoaded } from './actions'

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
  outlet: {
    display: 'block',
    position: 'static',
  },
})

interface Tab {
  id: string
  label: string
  path: string
  component: any
  icon: any
}

const TABS = [
  {
    id: 'info',
    label: 'info',
    path: routes.AVATAR_EDIT_INFO,
    component: AvatarEditInfo,
    icon: informationCircle,
  },
  {
    id: 'skin',
    label: 'skin',
    path: routes.AVATAR_EDIT_SKIN,
    component: AvatarEditSkin,
    icon: body,
  },
  {
    id: 'hair',
    label: 'hair',
    path: routes.AVATAR_EDIT_HAIR,
    component: AvatarEditHair,
    icon: person,
  },
  {
    id: 'eyes',
    label: 'eyes',
    path: routes.AVATAR_EDIT_EYES,
    component: AvatarEditEyes,
    icon: eye,
  },
  {
    id: 'top',
    label: 'top',
    path: routes.AVATAR_EDIT_TOP,
    component: AvatarEditTop,
    icon: shirt,
  },
  {
    id: 'bottom',
    label: 'bottom',
    path: routes.AVATAR_EDIT_BOTTOM,
    component: AvatarEditBottom,
    icon: walk,
  },
]

const DEFAULT_AVATAR_VALUE: Avatar = {
  id: '',
  components: [],
  name: '',
} as Avatar

export const EditAvatar = () => {
  const params = useParams<{
    avatarId: string
    detail?: string
  }>()

  // console.log(`params`, params)

  const { avatarId, detail } = params

  const [avatar, dispatch] = useReducer<EditAvatarReducer, Avatar>(
    editAvatarReducer,
    DEFAULT_AVATAR_VALUE,
    (avatar: Avatar) => avatar,
  )

  const { error, loading, avatars } = useFetchAvatars()

  if (avatars && avatars.length) {
  }
  const foundAvatar = avatars.find((a) => a.id === avatarId)

  if (foundAvatar && !avatar.id) {
    dispatch(avatarLoaded({ avatar: foundAvatar }))
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
        {TABS.map((t) => {
          return (
            <IonButton
              key={t.id}
              routerLink={buildUrl(routes.AVATAR_EDIT_DETAIL, {
                avatarId,
                detail: t.id,
              })}
            >
              <IonIcon icon={t.icon}></IonIcon>
            </IonButton>
          )
        })}
      </nav>
      <div className={classes.outlet}>
        <IonLoading isOpen={loading} />
        {!loading &&
          !error &&
          TABS.filter((t) => t.id === detail).map((t) => (
            <t.component key={t.id} avatar={avatar} dispatch={dispatch} />
          ))}
      </div>
    </ToolbarPage>
  )
}
