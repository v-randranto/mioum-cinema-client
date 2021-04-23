import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
}));

const Presentation = ({ handleOpen, setSortCriterion}) => {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Ma petite collection de films
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="inherit" onClick={() =>setSortCriterion(1)}>
                Par titre
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="inherit" onClick={() =>setSortCriterion(2)}>
                Par réalisateur
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="inherit" onClick={() =>setSortCriterion(3)}>
                Par année
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() =>handleOpen()}>
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
