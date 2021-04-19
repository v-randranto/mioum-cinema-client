import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createFilm, updateFilm } from '../../actions/films';
import removeCommaEnding from '../../utils/removeCommaEnding'

const formInit = {
  year: '',
  director: '',
  directors: '',
  title: '',
  summary: '',
  genres: '',
  actors: '',
  score: '',
  selectedFile: '',
};

const Form = ({ currentId, setCurrentId }) => {
  const [filmData, setFilmData] = useState(formInit);
  const film = useSelector((state) =>
    currentId ? state.films.find((summary) => summary._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    let setData = {}
    if (film) {
      const { year, title, summary, selectedFile, score, director } = film;
       setData = {
        year, title, summary, selectedFile, score, director, 
        genres: film.genres.toString(), 
        directors: film.directors.toString(), 
        actors: film.actors.toString()                                                                              
      }
    }
    setFilmData(setData);
  }, [film]);
  
  const clear = () => {
    setCurrentId(0);
    setFilmData(formInit);
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    const data = {...filmData}
    data[name] = value
    setFilmData(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { year, title, summary, selectedFile, score, director } = filmData;
  
    let filmSubmit = {
      year, title, summary, selectedFile, score, director, 
      genres: [], 
      directors: [], 
      actors: []                     
    }

    if (filmData.directors && filmData.directors.length) {  
      filmSubmit.directors = removeCommaEnding(filmData.directors.trim()).split(',')
    }
    if (filmData.actors && filmData.actors.length) {
      filmSubmit.actors = removeCommaEnding(filmData.actors.trim()).split(',') 
    }
    if (filmData.genres && filmData.genres.length) {
      filmSubmit.genres = removeCommaEnding(filmData.genres.trim()).split(',') 
    }

    if (currentId === 0) {
      dispatch(createFilm(filmSubmit));
      clear();
    } else {
      dispatch(updateFilm(currentId, filmSubmit));
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
          id="titleInput"
          name="title"
          variant="outlined"
          label="Titre"
          fullWidth
          required
          value={filmData.title}
          onChange={handleChange}
        />
        <TextField
          name="director"
          variant="outlined"
          label="Réalisateur - A SUPPRIMER"
          fullWidth
          value={filmData.director}
          disabled
          onChange={handleChange}
        />
        <TextField
          name="directors"
          variant="outlined"
          label="Réalisateurs (séparés par une virgule)"
          fullWidth
          value={filmData.directors}
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
          value={filmData.summary}
          onChange={handleChange}
        />
        <TextField
          name="actors"
          variant="outlined"
          label="Acteurs (séparés par une virgule)"
          fullWidth
          value={filmData.actors}
          onChange={handleChange}
        />
        <TextField
          name="genres"
          variant="outlined"
          label="Genres (séparés par une virgule)"
          fullWidth
          value={filmData.genres}
          onChange={handleChange}
        />
        <TextField
          id="scoreInput"
          type="number"
          InputProps={{
            inputProps: {
              max: 10,
              min: 0,
            },
          }}
          name="score"
          variant="outlined"
          label="Note sur 10"
          fullWidth
          value={filmData.score}
          onChange={handleChange}
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
