import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { brown } from '@material-ui/core/colors';

import Presentation from './Presentation';
import Films from './films/Films';
import { getFilms } from '../actions/films';

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

  const [currentId, setCurrentId] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    console.log('getFilms');
    dispatch(getFilms(filmsData?.page));
  }, [dispatch, filmsData.page]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setCurrentId(0)
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      {filmsData?.filmsTotal > 0 ? (
        <main>
          <Presentation
            maxWidth="xl"
            handleOpen={handleOpen}
            nbFilms={filmsData.filmsTotal}
          />

          <Paper className={classes.paper}>
            <Container maxWidth="xl">
              <Films
                setCurrentId={setCurrentId}
                open={open}
                handleOpen={handleOpen}
                nbFilms={filmsData.filmsTotal}
              />
            </Container>
          </Paper>

          <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Form
                currentId={currentId}
                setCurrentId={setCurrentId}
                handleClose={handleClose}
              />
            </Fade>
          </Modal>
        </main>
      ) : (
        <CircularProgress className={classes.root} />
      )}
    </>
  );
}
