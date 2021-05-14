import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import { brown } from '@material-ui/core/colors';

import Presentation from './Presentation';
import Films from './films/Films';
import { getFilms } from '../actions/films';
import { resetCurrentId } from '../actions/currentId';
import { defaultSearch } from '../models/search';

import Form from './form/Form';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(8),
    justifyContent: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%',
    marginLeft: '33%',
  },
  paper: {
    backgroundColor: brown[100],
  },
}));

export default function Home() {
  const filmsData = useSelector((state) => state.filmsData);
  const [searchData, setSearchData] = useState();
  const [openFilmForm, setOpenFilmForm] = useState(false);
  

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (filmsData.page === 0) {
      dispatch(getFilms(1, null, defaultSearch));
      setSearchData(defaultSearch);
    }
  }, [dispatch, filmsData.page, searchData]);

  const handleFilmForm = () => {
    setOpenFilmForm(true);
  };
  const handleCloseFilmForm = () => {
    dispatch(resetCurrentId());
    setOpenFilmForm(false);
  };

  return (
    <>
      <CssBaseline />
      {filmsData?.totalFilms > 0 ? (
        <main>
          <Presentation
            maxWidth="xl"
            handleOpen={handleFilmForm}
            searchData={searchData}
            setSearchData={setSearchData}
          />

          <Paper className={classes.paper}>
            <Container maxWidth="xl">
              <Films handleOpen={handleFilmForm} searchData={searchData} />
            </Container>
          </Paper>

          <Modal
            className={classes.modal}
            open={openFilmForm}
            onClose={handleCloseFilmForm}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openFilmForm}>
              <Form handleClose={handleCloseFilmForm} />
            </Fade>
          </Modal>
        </main>
      ) : (
        <CircularProgress className={classes.root} />
      )}
    </>
  );
}
