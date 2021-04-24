import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import Film from './film/Film';
import useSortFilms from './useSortFilms';

const Films = ({ setCurrentId, open, handleOpen, sortCriterion }) => {
  const films = useSelector((state) => state.films);
  useSortFilms(sortCriterion, films);

  return (
    <>
      {!films && <LinearProgress />}

      {films && (
        <Grid container spacing={5}>
          {films.map((film) => (
            <Grid item key={film._id} xs={12} md={2}>
              <Film
                film={film}
                setCurrentId={setCurrentId}npm start
                open={open}
                handleOpen={handleOpen}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Films;
