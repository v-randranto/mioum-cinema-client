import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getFilms } from '../../../actions/films';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  heroButtons: {
    margin: theme.spacing(2, 1),
  },
}));

const Presentation = () => {
  const filmsData = useSelector((state) => state.filmsData);
  const searchData = useSelector((state) => state.searchData);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const {page} = filmsData
  const backToList = () => {
    dispatch(getFilms(page, null, searchData));
    history.push('/home');
  };

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={backToList}>
                Retour à la liste
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Presentation;
