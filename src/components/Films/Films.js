import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Film from './film/Film';
import { getFilms } from '../../actions/films';

const Films = ({ setCurrentId, open, handleOpen }) => {
  const filmsData = useSelector((state) => state.filmsData);
  const searchData = useSelector((state) => state.searchData);
  const dispatch = useDispatch();
  const {
    films,
    count,
    page,
    size,
    totalFilteredFilms,
  } = filmsData;

  const handlePageChange = (e, newPage) => {
    dispatch(getFilms(newPage, size, searchData));
  };

  return (
    <>
      {totalFilteredFilms > 0 && (
        <>
          <Grid container  alignItems="center">
            <Grid item>
              <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={0}
                boundaryCount={3}
                showFirstButton
                showLastButton
                size="small"
                color="secondary"
                onChange={handlePageChange}
                style={{ padding: '10px' }}
              />
            </Grid>
          </Grid>

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
      {!totalFilteredFilms && (
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Aucun résultat
        </Typography>
      )}
    </>
  );
};

export default Films;
