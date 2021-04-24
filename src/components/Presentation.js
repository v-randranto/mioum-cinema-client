import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
}));

const Presentation = ({ handleOpen, setSortCriterion, nbFilms }) => {
  const classes = useStyles();
  const [titleSortToggle, setTitleSortToggle] = useState(false);
  const [directorSortToggle, setDirectorSortToggle] = useState(false);
  const [yearSortToggle, setYearSortToggle] = useState(false);
  const nbFilmsText = nbFilms ? `(${nbFilms})` : ""

  const handleSortTitle = () => {
    if (titleSortToggle) {
      setSortCriterion(11);
    } else {
      setSortCriterion(10);
    }
    setTitleSortToggle(!titleSortToggle);
    setDirectorSortToggle(false);
    setYearSortToggle(false);
  };

  const handleSortDirector = () => {
    if (directorSortToggle) {
      setSortCriterion(21);
    } else {
      setSortCriterion(20);
    }
    setDirectorSortToggle(!directorSortToggle);
    setTitleSortToggle(false);
    setYearSortToggle(false);
  };

  const handleSortYear = () => {
    if (yearSortToggle) {
      setSortCriterion(31);
    } else {
      setSortCriterion(30);
    }
    setYearSortToggle(!yearSortToggle);
    setTitleSortToggle(false);
    setDirectorSortToggle(false);
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
