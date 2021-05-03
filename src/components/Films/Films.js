import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Film from './film/Film'

const Films = ({ setCurrentId, open, handleOpen }) => {
  const films = useSelector((state) => state.films);

  return (
    <>
      {films && (
   
          <Grid container spacing={5} alignItems="center">
            {films.map((film) => (
              <Grid item key={film._id} xs={12} sm={4} md={2}>
                <Film
                  film={film}
                  setCurrentId={setCurrentId}
                  npm
                  start
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
