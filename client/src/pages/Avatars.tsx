import React, { useCallback } from 'react'
import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonRouterLink,
  useIonRouter,
} from '@ionic/react'
import { add, pencil, checkmark, trashBin } from 'ionicons/icons'
import { createUseStyles } from 'react-jss'
import { ToolbarPage } from './ToolbarPage'
import { useCreateAvatar } from '../avatar/useCreateAvatar'
import { useFetchAvatars } from '../avatar/useFetchAvatars'
import { AvatarPreview } from '../components/AvatarPreview'
import { useDeleteAvatar } from '../avatar/useDeleteAvatar'
import { FetchAvatars_myAvatars } from '../avatar/types/FetchAvatars'

const useStyles = createUseStyles({
  title: {
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '1rem',
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '1rem',
    boxShadow:
      'inset 0 -30px 70px rgba(255,255,255,0.03), inset 0 10px 50px rgba(255,255,255,0.03), 0 3px 10px rgba(0,0,0,0.7)',
    border: '1px solid rgba(255,255,255,0.1)',
    marginTop: '1rem',
  },
  preview: {
    padding: '1rem',
  },
  avatarLabel: {
    marginTop: '0',
    textAlign: 'left',
  },
  avatarRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexGrow: 1,
    paddingRight: '1rem',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  control: {
    '--border-radius': '4rem',
    '--padding-top': '1.5rem',
    '--padding-bottom': '1.5rem',
    marginLeft: '1rem',
  },
})

export const Avatars = () => {
  const classes = useStyles()
  const { avatars, refetch } = useFetchAvatars()
  const { createAvatar } = useCreateAvatar()
  const { deleteAvatar } = useDeleteAvatar()
  const router = useIonRouter()

  const handleNewAvatar = useCallback(async () => {
    const newAvatar = await createAvatar({ variables: { input: {} } })
    refetch()
    router.push(`/avatars/${newAvatar.data?.createAvatar.id}`)
  }, [createAvatar, refetch, router])

  const handleDeleteAvatar = (a: FetchAvatars_myAvatars) => () => {
    deleteAvatar({
      variables: {
        input: {
          id: a.id,
        },
      },
    })
  }

  return (
    <ToolbarPage>
      <h1 className={classes.title}>Avatars</h1>
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton color="success" onClick={handleNewAvatar}>
          <IonIcon color="light" icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <div className={classes.container}>
        {!avatars.length && (
          <IonButton onClick={handleNewAvatar} color="success">
            <IonIcon color="light" icon={add}></IonIcon> Create New Avatar
          </IonButton>
        )}
        {avatars.map((a) => (
          <div className={classes.avatarContainer} key={a.id}>
            <AvatarPreview
              multiplier={3}
              avatar={a}
              className={classes.preview}
            />
            <div className={classes.avatarRight}>
              <h3 className={classes.avatarLabel}>{a.name}</h3>
              <div className={classes.controls}>
                <IonButton
                  title="select"
                  className={classes.control}
                  fill="outline"
                >
                  <IonIcon icon={checkmark} />
                  {/* <IonText>select</IonText> */}
                </IonButton>
                <IonRouterLink routerLink={`/avatars/${a.id}/info`}>
                  <IonButton
                    title="edit"
                    color="warning"
                    className={classes.control}
                  >
                    <IonIcon icon={pencil} />
                    {/* <IonText>edit</IonText> */}
                  </IonButton>
                </IonRouterLink>
                <IonButton
                  title="delete"
                  color="danger"
                  className={classes.control}
                  onClick={handleDeleteAvatar(a)}
                >
                  <IonIcon icon={trashBin} />
                  {/* <IonText>delete</IonText> */}
                </IonButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToolbarPage>
  )
}
