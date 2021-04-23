import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/Home';
import FilmCard from './components/films/film/FilmCard';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import ScrollTop from './components/layout/ScrollTop'
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './index.css'

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
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <Toolbar id="back-to-top-anchor" />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/film-card/:id">
            <FilmCard />
          </Route>
        </Switch>

        <ScrollTop {...props}>
          <Fab color="secondary" size="small">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </ThemeProvider>
    </Router>
  );
};

export default App;
