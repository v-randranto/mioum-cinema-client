import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Film from './film/Film'
import { getFilms } from '../../actions/films';

const Films = ({ setCurrentId, open, handleOpen }) => {
  const filmsData = useSelector((state) => state.filmsData);
  const dispatch = useDispatch()
  const {films, count, page} = filmsData

  const handlePageChange = (e, newPage) => {
    dispatch(getFilms(newPage));
  }

  return (
    <>
      {films && (
        <>
        <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={0}
              boundaryCount={4}
              showFirstButton 
              showLastButton
              size="small"
              color="secondary"
              onChange={handlePageChange}
              style={{padding: "10px"}}
            />
          <Grid container spacing={5} alignItems="center">
            {films.map((film) => (
              <Grid item key={film._id} xs={12} sm={4} md={2}>
                <Film
                  film={film}
                  setCurrentId={setCurrentId}
                  open={open}
                  handleOpen={handleOpen}
                />
              </Grid>
            ))}
          </Grid>
  </>
      )}
    </>
  );
};

export default Films;
