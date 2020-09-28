import {
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'

export const Loading = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">VCRPG</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLoading isOpen />
      </IonContent>
    </IonPage>
  )
}
