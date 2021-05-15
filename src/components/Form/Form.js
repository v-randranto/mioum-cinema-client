import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './styles';
import { createFilm, updateFilm } from '../../actions/films';

import removeCommaEnding from '../../utils/removeCommaEnding';
import filmFormModel from '../../models/filmForm';

const GreyCheckbox = withStyles({
  root: {
    color: '#2980b9',
    '&$checked': {
      color: '#2980b9',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const yearProps = {
  minLength: 4,
  maxLength: 4,
};

const Form = ({ handleCloseForm, currentId }) => {
  const [filmData, setFilmData] = useState(filmFormModel);
  const [saveData, setSaveData] = useState();
  const filmsData = useSelector((state) => state.filmsData);

  const { films } = filmsData;
  const film = currentId ? films.find((film) => film._id === currentId) : null;
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
        photoUrl,
        score,
        scoreComposer,
        originalTitle,
        seen,
      } = film;
      setData = {
        year,
        title,
        summary,
        selectedFile,
        photoUrl,
        score,
        scoreComposer,
        originalTitle,
        seen,
        genres: film.genres.toString(),
        directors: film.directors.toString(),
        actors: film.actors.toString(),
        countries: film.countries.toString(),
      };
      setFilmData(setData);
      setSaveData(setData);
    }
  }, [film]);

  const clear = () => {
    setFilmData(filmFormModel);
  };

  const reset = () => {
    setFilmData(saveData);
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
      photoUrl,
      score,
      scoreComposer,
      originalTitle,
      seen,
    } = filmData;

    let filmSubmit = {
      year,
      title,
      summary,
      selectedFile,
      photoUrl,
      score,
      scoreComposer,
      originalTitle,
      seen,
      countries: [],
      genres: [],
      directors: [],
      actors: [],
      links: [],
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

    if (filmData.countries && filmData.countries.length) {
      filmSubmit.countries = removeCommaEnding(filmData.countries.trim()).split(
        ','
      );
    }

    if (filmData.links && filmData.links.length) {
      filmSubmit.links = removeCommaEnding(filmData.links.trim()).split(',');
    }

    if (currentId === 0) {
      dispatch(createFilm(filmSubmit));
      clear();
    } else {
      dispatch(updateFilm(currentId, filmSubmit));
      handleCloseForm();
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={`${classes.root} ${classes.form}`}
      onSubmit={handleSubmit}
    >
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
        onChange={handleChange}
      />
      <Grid
        container
        direction="row"
        justify-content="space-between"
        align-items="flex-start"
        align-content="flex-start"
        spacing={2}
      >
        <Grid item xs={2} style={{paddingRight: 0}}>
          <TextField
            id="yearInput"
            name="year"
            variant="outlined"
            label="Année"
            size="small"
            inputProps={yearProps}
            value={filmData.year}            
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={8} style={{paddingLeft: 0, paddingRight: 0}} >
          <TextField
            name="countries"
            variant="outlined"
            label="Pays (séparés par une virgule)"
            size="small"
            value={filmData.countries}
            style={{width: "350px"}}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2} style={{paddingLeft: 0, paddingRight: 0}}>
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

      <TextField
        name="links"
        variant="outlined"
        fullWidth
        size="small"
        label="Liens (séparés par une virgule)"
        value={filmData.links}
        onChange={handleChange}
      />

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
        className={classes.buttonSubmit}
        variant="contained"
        color="secondary"
        size="small"
        onClick={reset}
        fullWidth
      >
        Réinitialiser
      </Button>
    </form>
  );
};

export default Form;
