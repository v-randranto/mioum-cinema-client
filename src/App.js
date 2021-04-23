import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/Home';
import FilmCard from './components/films/film/FilmCard';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#ffe082',
    },
  },
});

const App = () => {
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <Header />
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
      </ThemeProvider>
    </Router>
  );
};

export default App;
