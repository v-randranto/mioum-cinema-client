import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as Toggles from '../actions/sortToggles';
import * as Criteria from '../actions/sortCriteria';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
}));

const Presentation = ({ handleOpen, nbFilms }) => {
  const sortToggles = useSelector((state) => state.sortToggles);
  const dispatch = useDispatch();
  const classes = useStyles();
  const nbFilmsText = nbFilms ? `(${nbFilms})` : '';
  const { titleToggle, directorToggle, yearToggle } = sortToggles;

  const handleSortTitle = () => {
    dispatch(Criteria.sortByTitle(titleToggle))
    dispatch(Toggles.sortByTitle(titleToggle));
  };

  const handleSortDirector = () => {
    dispatch(Criteria.sortByDirector(directorToggle))
    dispatch(Toggles.sortByDirector(directorToggle));
  };

  const handleSortYear = () => {
    dispatch(Criteria.sortByYear(yearToggle))
    dispatch(Toggles.sortByYear(yearToggle));
  };
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Ma petite collection de films {nbFilmsText}
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleSortTitle}
              >
                Par titre
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleSortDirector}
              >
                Par réalisateur
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleSortYear}
              >
                Par année
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen()}
              >
                Ajouter un film
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Presentation;
