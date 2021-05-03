import React from 'react';

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
  formInline: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
  },
  formBtn: {
    marginLeft: theme.spacing(2),
  },
}));

const Presentation = ({ handleOpen, nbFilms, doFilter }) => {
  const classes = useStyles();
  const nbFilmsText = nbFilms ? `(${nbFilms})` : '';

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="xl">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Ma petite collection de films {nbFilmsText}
        </Typography>

        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center" alignItems="center">
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
