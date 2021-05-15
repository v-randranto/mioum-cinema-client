import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getFilms } from '../actions/films';
import { defaultSearch } from '../models/search';
import {useAuth} from '../contexts/AuthContext'

import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  formInline: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    margin: '7px',
  },
  formBtn: {
    padding: '6px',
    margin: '1px 7px',
    fontSize: '0.9rem',
  },
  formField: {
    padding: '0',
    margin: '0 7px',
  },
}));

const yearProps = {
  minLength: 4,
  maxLength: 4,
};

const Presentation = (props) => {
  const { handleOpenForm, size, searchData, setSearchData} = props;
  const filmsData = useSelector((state) => state.filmsData);
  const [searchForm, setSearchForm] = useState(searchData || defaultSearch);
  const {currentUser} = useAuth()
  const classes = useStyles();
  const { totalFilteredFilms, totalFilms } = filmsData;
  const nbFilmsText = totalFilms ? `(${totalFilms})` : '';

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = { ...searchForm };
    data[name] = value;
    if (name === 'sort') {
      if (value === '') {
        data['direction'] = '';
      } else {
        data['direction'] = '1';
      }
    }
    setSearchForm(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();    setSearchData(searchForm);
    dispatch(getFilms(1, size, searchForm));
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSearchData(defaultSearch);
    setSearchForm(defaultSearch);
    dispatch(getFilms(1, size, defaultSearch));
  };

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="xl">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Ma petite collection de films {nbFilmsText}
        </Typography>

        <div className={classes.heroButtons}>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
          >
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <TextField
                  className={classes.formField}
                  name="term"
                  variant="outlined"
                  label="Titre, réalisateur, acteur ou genre"
                  value={searchForm.term}
                  margin="dense"
                  type="search"
                  style={{ width: '300px' }}
                  onChange={handleChange}
                  width="80px"
                ></TextField>
                <TextField
                  className={classes.formField}
                  name="minYear"
                  variant="outlined"
                  label="An min."
                  value={searchForm.minYear}
                  margin="dense"
                  type="search"
                  style={{ width: '80px' }}
                  inputProps={yearProps}
                  onChange={handleChange}
                  width="80px"
                ></TextField>
                <TextField
                  className={classes.formField}
                  name="maxYear"
                  variant="outlined"
                  label="An max."
                  value={searchForm.maxYear}
                  margin="dense"
                  type="search"
                  style={{ width: '80px' }}
                  inputProps={yearProps}
                  onChange={handleChange}
                ></TextField>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Vu</InputLabel>
                  <Select
                    className={classes.formField}
                    value={searchForm.seen}
                    onChange={handleChange}
                    label="Vu"
                    name="seen"
                    margin="dense"
                  >
                    <MenuItem value="">indif.</MenuItem>
                    <MenuItem value={1}>oui</MenuItem>
                    <MenuItem value={0}>non</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Tri</InputLabel>
                  <Select
                    className={classes.formField}
                    value={searchForm.sort}
                    onChange={handleChange}
                    name="sort"
                    margin="dense"
                    label="Tri"
                  >
                    <MenuItem value="">indif.</MenuItem>
                    <MenuItem value="title">titre</MenuItem>
                    <MenuItem value="year">année</MenuItem>
                    <MenuItem value="lastModifiedAt">date modif</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Sens</InputLabel>
                  <Select
                    className={classes.formField}
                    value={searchForm.direction}
                    onChange={handleChange}
                    name="direction"
                    margin="dense"
                    label="Sens"
                  >
                    <MenuItem value="">indif.</MenuItem>
                    <MenuItem value={1}>asc</MenuItem>
                    <MenuItem value={-1}>desc</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  className={classes.formBtn}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  OK
                </Button>
                <Button
                  className={classes.formBtn}
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                >
                  Reset
                </Button>

                {totalFilms !== totalFilteredFilms && (
                  <Button
                    className={classes.formBtn}
                    variant="contained"
                    style={{ color: '#455A64' }}
                  >
                    Résultat : {totalFilteredFilms} films
                  </Button>
                )}
              </Grid>
            </form>
            {currentUser.role !== 'guest' && (
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenForm()}
                >
                  Ajouter un film
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Presentation;
