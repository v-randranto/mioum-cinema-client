import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { updateFilm } from '../../actions/films';
import removeCommaEnding from '../../utils/removeCommaEnding';

const GreyCheckbox = withStyles({
  root: {
    color: '#2980b9',
    '&$checked': {
      color: '#2980b9',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
  seen: false,
  country: '',
  selectedFile: '',
};

const Form = ({ film }) => {
  const [filmData, setFilmData] = useState(formInit);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const {
      year,
      title,
      summary,
      selectedFile,
      score,
      scoreComposer,
      originalTitle,
      seen,
      country,
    } = film;
    const setData = {
      year,
      title,
      summary,
      selectedFile,
      score,
      scoreComposer,
      originalTitle,
      seen,
      country,
      genres: film.genres.toString(),
      directors: film.directors.toString(),
      actors: film.actors.toString(),
    };

    setFilmData(setData);
  }, [film]);

  const reset = () => {
    const {
      year,
      title,
      summary,
      selectedFile,
      score,
      scoreComposer,
      originalTitle,
      seen,
      country,
    } = film;
    const setData = {
      year,
      title,
      summary,
      selectedFile,
      score,
      scoreComposer,
      originalTitle,
      seen,
      country,
      genres: film.genres.toString(),
      directors: film.directors.toString(),
      actors: film.actors.toString(),
    };
    setFilmData(setData);
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
      seen,
      country,
    } = filmData;

    let filmSubmit = {
      year,
      title,
      summary,
      selectedFile,
      score,
      scoreComposer,
      originalTitle,
      seen,
      country,
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
    dispatch(updateFilm(film._id, filmSubmit));
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Modifier</Typography>
        <TextField
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
          size="small"
          value={filmData.originalTitle}
          onChange={handleChange}
        />
        <TextField
          name="directors"
          variant="outlined"
          label="Réalisateurs (séparés par une virgule)"
          fullWidth
          size="small"
          value={filmData.directors}
          onChange={(e) =>
            setFilmData({ ...filmData, directors: e.target.value })
          }
        />
        <Grid
          container
          direction="row"
          justify-content="space-between"
          align-items="flex-start"
          align-content="flex-start"
          spacing={4}
        >
          <Grid item xs={4}>
            <TextField
              id="yearInput"
              type="year"
              name="year"
              variant="outlined"
              label="Année"
              value={filmData.year}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="country"
              variant="outlined"
              label="Pays"
              value={filmData.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <GreyCheckbox
                  className={classes.checkbox}
                  checked={filmData.seen}
                  onChange={() => {
                    const data = { ...filmData };
                    data.seen = !filmData.seen;
                    setFilmData(data);
                  }}
                />
              }
              label="Vu"
            />
          </Grid>
        </Grid>
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
          max={3}
          onChange={(event, newValue) => {
            const data = { ...filmData };
            data.score = newValue;
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
          onClick={reset}
          fullWidth
        >
          Réinitialiser
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
