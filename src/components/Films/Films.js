import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Film from './film/Film';
import useSortFilms from './useSortFilms';

const Films = ({ setCurrentId, open, handleOpen, sortCriterion }) => {
  const films = useSelector((state) => state.films);
  useSortFilms(sortCriterion, films);

  return (
    <>
      {!films && <CircularProgress />}

      {films && (
        <Grid container spacing={8}>
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
