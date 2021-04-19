import React from 'react'
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import { createUseStyles, ThemeProvider } from 'react-jss'
import { rootStyles } from './rootStyles'

/* Pages */
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { NewGame } from './pages/NewGame'
import { Game } from './pages/Game'
import { PrivateRoute } from './components/PrivateRoute'

/* Routes */
import { routes } from './routes'

/* Theme variables */
import './theme/variables.css'
import './theme/base.css'

/* Providers */
import { AuthProvider } from './auth/AuthProvider'
import { NetworkProvider } from './network/NetworkProvider'
import JoinGame from './pages/JoinGame'
import Footer from './components/Footer'

/* Set up theme */
const useTheme = createUseStyles(rootStyles)
const App = () => {
  const theme = useTheme()
  return (
    <NetworkProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Route exact path={routes.HOME} render={() => <Home />} />
            <PrivateRoute exact path={routes.NEW_GAME}>
              <NewGame />
            </PrivateRoute>
            <Route exact path={routes.GAME}>
              <Game />
            </Route>
            <Route exact path={routes.JOIN_GAME}>
              <JoinGame />
            </Route>
            <Route
              exact
              path={routes.ROOT}
              render={() => <Redirect to={routes.HOME} />}
            />
            <Route exact path={routes.LOGIN} render={() => <Login />} />
          </Router>
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </NetworkProvider>
  )
}

export default App
