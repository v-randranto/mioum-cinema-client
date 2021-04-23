import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createFilm, updateFilm } from '../../actions/films';
import removeCommaEnding from '../../utils/removeCommaEnding';

const formInit = {
  year: '',
  originalTitle: '',
  directors: '',
  title: '',
  summary: '',
  genres: '',
  actors: '',
  score: '',
  scoreComposer: '',
  selectedFile: '',
};

const Form = ({ currentId, setCurrentId, handleClose }) => {
  const [filmData, setFilmData] = useState(formInit);
  const film = useSelector((state) =>
    currentId ? state.films.find((summary) => summary._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    let setData = {};
    if (film) {
      const {
        year,
        title,
        summary,
        selectedFile,
        score,
        scoreComposer,
        originalTitle,
      } = film;
      setData = {
        year,
        title,
        summary,
        selectedFile,
        score,
        scoreComposer,
        originalTitle,
        genres: film.genres.toString(),
        directors: film.directors.toString(),
        actors: film.actors.toString(),
      };
    }
    setFilmData(setData);
  }, [film]);

  const clear = () => {
    setCurrentId(0);
    setFilmData(formInit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = { ...filmData };
    data[name] = value;
    setFilmData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      year,
      title,
      summary,
      selectedFile,
      score,
      scoreComposer,
      originalTitle,
    } = filmData;

    let filmSubmit = {
      year,
      title,
      summary,
      selectedFile,
      score,
      scoreComposer,
      originalTitle,
      genres: [],
      directors: [],
      actors: [],
    };

    if (filmData.directors && filmData.directors.length) {
      filmSubmit.directors = removeCommaEnding(filmData.directors.trim()).split(
        ','
      );
    }
    if (filmData.actors && filmData.actors.length) {
      filmSubmit.actors = removeCommaEnding(filmData.actors.trim()).split(',');
    }
    if (filmData.genres && filmData.genres.length) {
      filmSubmit.genres = removeCommaEnding(filmData.genres.trim()).split(',');
    }

    if (currentId === 0) {
      dispatch(createFilm(filmSubmit));
      clear();
    } else {
      dispatch(updateFilm(currentId, filmSubmit));
      handleClose();
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
          {currentId ? `Modifier` : 'Ajouter'}
        </Typography>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          id="titleInput"
          name="title"
          variant="outlined"
          label="Titre"
          fullWidth
          required
          size="small"
          value={filmData.title}
          onChange={handleChange}
        />
        <TextField
          name="originalTitle"
          variant="outlined"
          label="Titre original"
          fullWidth
          value={filmData.originalTitle}
          size="small"
          onChange={handleChange}
        />
        <TextField
          name="directors"
          variant="outlined"
          label="Réalisateurs (séparés par une virgule)"
          fullWidth
          value={filmData.directors}
          size="small"
          onChange={(e) =>
            setFilmData({ ...filmData, directors: e.target.value })
          }
        />
        <TextField
          id="yearInput"
          type="year"
          name="year"
          variant="outlined"
          label="Année"
          fullWidth
          value={filmData.year}
          onChange={handleChange}
        />
        <TextField
          name="summary"
          variant="outlined"
          label="Résumé"
          fullWidth
          multiline
          rows={4}
          size="small"
          value={filmData.summary}
          onChange={handleChange}
        />
        <TextField
          name="actors"
          variant="outlined"
          label="Acteurs (séparés par une virgule)"
          fullWidth
          size="small"
          value={filmData.actors}
          onChange={handleChange}
        />
        <TextField
          name="scoreComposer"
          variant="outlined"
          label="Compositeur de la musique"
          fullWidth
          size="small"
          value={filmData.scoreComposer}
          onChange={handleChange}
        />
        <TextField
          name="genres"
          variant="outlined"
          label="Genres (séparés par une virgule)"
          fullWidth
          size="small"
          value={filmData.genres}
          onChange={handleChange}
        />
        <Rating
          name="score"
          value={+filmData.score}
          precision={0.5}
          onChange={(event, newValue) => {
            const data = { ...filmData };
            data.score = +newValue;
            setFilmData(data);
          }}
        />
        <div className={classes.fileInput}>
          <Typography variant="body1" color="textSecondary">
            Photo
          </Typography>
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
