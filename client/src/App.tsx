import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, iosTransitionAnimation } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { createUseStyles, ThemeProvider } from 'react-jss'
import { rootStyles } from './rootStyles'

/* Components */
import { Menu } from './components/Menu'

/* Pages */
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Avatars } from './pages/Avatars'
import { PrivateRoute } from './components/PrivateRoute'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

/* Providers */
import { AuthProvider } from './auth/AuthProvider'
import { NetworkProvider } from './network/NetworkProvider'
import { EditAvatar } from './pages/EditAvatar'
import { IonRouteProps } from './types/ionic'

/* Set up theme */
const useTheme = createUseStyles(rootStyles)
const App = () => {
  const theme = useTheme()
  return (
    <NetworkProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <IonApp>
            <IonReactRouter>
              <Menu />
              <IonRouterOutlet id="content" animation={iosTransitionAnimation}>
                <Route exact path="/home">
                  <Home />
                </Route>
                <PrivateRoute exact path="/avatars">
                  {() => <Avatars />}
                </PrivateRoute>
                <PrivateRoute path="/avatars/:avatarId">
                  {(props: IonRouteProps) => (
                    <EditAvatar routeInfo={props.computedMatch} />
                  )}
                </PrivateRoute>
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route exact path="/login" component={Login} />
              </IonRouterOutlet>
            </IonReactRouter>
          </IonApp>
        </ThemeProvider>
      </AuthProvider>
    </NetworkProvider>
  )
}

export default App
