import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
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

const useStyles = makeStyles((theme) => ({
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
  const [currentId, setCurrentId] = useState(0);
  const [sortCriterion, setSortCriterion] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getFilms());
  }, [currentId, dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />

      <main>
        <Presentation
          handleOpen={handleOpen}
          setSortCriterion={setSortCriterion}
        />
        <Paper className={classes.paper}>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justify-content="space-between"
              align-items="flex-start"
              align-content="flex-start"
              style={{ padding: '20px 0' }}
            >
              <Grid item>
                <Films
                  setCurrentId={setCurrentId}
                  open={open}
                  handleOpen={handleOpen}
                  sortCriterion={sortCriterion}
                />
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </main>

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
    </>
  );
}
