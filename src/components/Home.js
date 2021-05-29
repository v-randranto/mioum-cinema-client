import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DraggableComponent from './shared/DraggableComponent';
import MuiDialogTitle from './mui/MuiDialogTitle'

import { makeStyles } from '@material-ui/core/styles';
import { brown } from '@material-ui/core/colors';

import Presentation from './Presentation';
import Films from './films/Films';
import { getFilms } from '../actions/films';
import { defaultSearch } from '../models/search';

import Form from './form/Form';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(8),
    justifyContent: 'center',
  },
  dialog: {
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
  const [currentId, setCurrentId] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (filmsData.page === 0) {
      dispatch(getFilms(1, null, defaultSearch));
      setSearchData(defaultSearch);
    }
  }, [dispatch, filmsData.page, searchData]);

  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = async () => {
    await setCurrentId(0);
    setOpenForm(false);    
  };

  return (
    <>
      <CssBaseline />
      {filmsData?.totalFilms > 0 ? (
        <main>
          <Presentation
            maxWidth="xl"
            handleOpenForm={handleOpenForm}
            searchData={searchData}
            setSearchData={setSearchData}
          />

          <Paper className={classes.paper}>
            <Container maxWidth="xl">
              <Films
                handleOpenForm={handleOpenForm}
                searchData={searchData}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Container>
          </Paper>

          <Dialog
            className={classes.modal}
            open={openForm}
            onClose={handleCloseForm}
            PaperComponent={DraggableComponent}
          >
            <MuiDialogTitle
              style={{ cursor: 'move' }}
              id="draggable-component-title"
              onClose={handleCloseForm}
            />
            <DialogContent>
              <Form handleCloseForm={handleCloseForm} currentId={currentId} />
            </DialogContent>
          </Dialog>
        </main>
      ) : (
        <CircularProgress className={classes.root} />
      )}
    </>
  );
}
