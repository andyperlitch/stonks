import React from 'react'
import { IonApp, IonRouterOutlet, iosTransitionAnimation } from '@ionic/react'
import { createUseStyles, ThemeProvider } from 'react-jss'
import { rootStyles } from './rootStyles'

/* Components */
import { Menu } from './components/Menu'

/* Pages */
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { NewGame } from './pages/NewGame'
import { Game } from './pages/Game'
import { PrivateRoute } from './components/PrivateRoute'

/* Routes */
import { routes } from './routes'

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
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import JoinGame from './pages/JoinGame'

/* Set up theme */
const useTheme = createUseStyles(rootStyles)
const App = () => {
  const theme = useTheme()
  return (
    <NetworkProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <IonApp>
              <Menu />
              <IonRouterOutlet id="content" animation={iosTransitionAnimation}>
                <Route exact path={routes.HOME} render={() => <Home />} />
                <PrivateRoute exact path={routes.NEW_GAME}>
                  <NewGame />
                </PrivateRoute>
                <PrivateRoute exact path={routes.GAME}>
                  <Game />
                </PrivateRoute>
                <Route
                  exact
                  path={routes.JOIN_GAME}
                  render={() => <JoinGame />}
                />
                <Route
                  exact
                  path={routes.ROOT}
                  render={() => <Redirect to={routes.HOME} />}
                />
                <Route exact path={routes.LOGIN} render={() => <Login />} />
              </IonRouterOutlet>
            </IonApp>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </NetworkProvider>
  )
}

export default App
