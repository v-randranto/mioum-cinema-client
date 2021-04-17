import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Film from './Film/Film';
import useStyles from './styles';

const Films = ({ setCurrentId }) => {
  const films = useSelector((state) => state.films);
  const classes = useStyles();

  return !films.length ? (
    <Typography className={classes.heading} variant="h5">
      Pas encore de films...
    </Typography>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {films.map((film) => (
        <Grid key={film._id} item xs={12} sm={6} md={6}>
          <Film film={film} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Films;
