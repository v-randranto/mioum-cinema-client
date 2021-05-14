import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import ScrollTop from './components/layout/ScrollTop';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Header from './components/layout/Header';
import Home from './components/Home';
import Login from './components/authentication/Login';

import PrivateRoute from './PrivateRoute';
import AuthService from './services/authService';
import { AuthContext } from './contexts/AuthContext';
import {toTitleCase} from './utils/textFormat'

import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#D13438',
      main: '#881798',
    },
    secondary: {
      main: '#ffe082',
    },
  },
});

const App = (props) => {
  const {currentSession} = AuthService
  const currentUserInit = {
    pseudo: currentSession?.pseudo ? toTitleCase(currentSession.pseudo) : null,
    role : currentSession?.role
  };
  const [currentUser, setCurrentUser] = useState(currentUserInit);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            currentUser,
            setCurrentUser,
          }}
        >
          <Header />
          <Toolbar id="back-to-top-anchor" />
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>

            <PrivateRoute exact path="/home" component={Home} />
          </Switch>

          <ScrollTop {...props}>
            <Fab color="secondary" size="small">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </AuthContext.Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
