import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

import Film from './film/Film';
import FilmCard from './film/FilmCard';

import { getFilms } from '../../actions/films';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    marginLeft: '33%',
  },
}));

const Films = (props) => {
  const { handleOpenForm, searchData, currentId, setCurrentId } = props;
  const filmsData = useSelector((state) => state.filmsData);
 
  const [openCard, setOpenCard] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const { films, count, page, size, totalFilteredFilms } = filmsData;
  const currentFilm = currentId
    ? films.find((film) => film._id === currentId)
    : null;

  const handlePageChange = (e, newPage) => {
    dispatch(getFilms(newPage, size, searchData));
  };

  const handleOpenCard = () => {
    setOpenCard(true);
  };

  const handleCloseCard = () => {
    setCurrentId(0);
    setOpenCard(false);
  };

  return (
    <>
      {totalFilteredFilms > 0 && (
        <>
          <Grid container alignItems="center">
            <Grid item>
              <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={3}
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
                  handleOpenForm={handleOpenForm}
                  handleOpenCard={handleOpenCard}
                  setCurrentId={setCurrentId}
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

      {openCard && currentFilm && (
        <Modal
          className={classes.modal}
          open={openCard}
          onClose={handleCloseCard}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openCard}>
            <FilmCard film={currentFilm} handleCloseCard={handleCloseCard} />
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default Films;
