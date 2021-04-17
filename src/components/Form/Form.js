import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createFilm, updateFilm } from '../../actions/films';

const Form = ({ currentId, setCurrentId }) => {
  const [filmData, setFilmData] = useState({
    year: '',
    director: '',
    title: '',
    summary: '',
    genres: '',
    actors: '',
    selectedFile: '',
  });
  const film = useSelector((state) =>
    currentId ? state.films.find((summary) => summary._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (film) setFilmData(film);
  }, [film]);

  const clear = () => {
    setCurrentId(0);
    setFilmData({
      year: '',
      director: '',
      genres: '',
      title: '',
      summary: '',
      actors: '',
      selectedFile: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createFilm(filmData));
      clear();
    } else {
      dispatch(updateFilm(currentId, filmData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Modifier "${film.title}"` : 'Ajouter un film'}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Titre"
          fullWidth
          value={filmData.title}
          onChange={(e) => setFilmData({ ...filmData, title: e.target.value })}
        />
        <TextField
          name="director"
          variant="outlined"
          label="Réalisateur"
          fullWidth
          value={filmData.director}
          onChange={(e) =>
            setFilmData({ ...filmData, director: e.target.value })
          }
        />
        <TextField
          name="year"
          variant="outlined"
          label="Année"
          fullWidth
          value={filmData.year}
          onChange={(e) => setFilmData({ ...filmData, year: e.target.value })}
        />
        <TextField
          name="summary"
          variant="outlined"
          label="Résumé"
          fullWidth
          multiline
          rows={4}
          value={filmData.summary}
          onChange={(e) =>
            setFilmData({ ...filmData, summary: e.target.value })
          }
        />
        <TextField
          name="actors"
          variant="outlined"
          label="Acteurs (séparés par une virgule)"
          fullWidth
          value={filmData.actors}
          onChange={(e) =>
            setFilmData({ ...filmData, actors: e.target.value.split(',') })
          }
        />
        <TextField
          name="genres"
          variant="outlined"
          label="Genres (séparés par une virgule)"
          fullWidth
          value={filmData.genres}
          onChange={(e) =>
            setFilmData({ ...filmData, genres: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setFilmData({ ...filmData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Envoyer
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Effacer
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
