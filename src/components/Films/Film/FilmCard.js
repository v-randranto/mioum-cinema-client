import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core/';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DeleteIcon from '@material-ui/icons/Delete';
import Rating from '@material-ui/lab/Rating';
import { useDispatch } from 'react-redux';

import displayArrayItems from '../../../utils/displayArrayItems';
import useStyles from './styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Form from '../../form/FormB';
import { deleteFilm, getFilms } from '../../../actions/films';
import Presentation from './Presentation';
import defaultImage from '../../../images/default_picture.jfif';

const FilmCard = () => {
  const { id } = useParams();
  const history = useHistory();
  const filmsData = useSelector((state) => state.filmsData);
  const {page} = filmsData
  const film = id ? filmsData.films.find((summary) => summary._id === id) : null
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDelete = () => {
    dispatch(deleteFilm(film._id));
    dispatch(getFilms(page));
    history.push('/home');
  };

  return (
    <>
      <CssBaseline />
      <Presentation />
      <Paper className={classes.paper}>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justify="space-around"
            alignItems="stretch"
            spacing={3}
            style={{ padding: '20px 0' }}
          >
            <Grid item xs={12} md={5}>
              <Card className={classes.card}>
                <CardHeader
                  className={classes.cardHeader}
                  title={film.title}
                  subheader={film.originalTitle}
                />
                <CardMedia
                  className={classes.media}
                  image={film.photoUrl || defaultImage}
                  title={film.title}
                />
                <CardContent className={classes.cardContent}>
                  {(film.directors.length > 0 || film.year) && (
                    <div className={classes.details}>
                      <Typography
                        className={classes.title}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {film.directors.length > 0 && (
                          <>{displayArrayItems(film.directors)}</>
                        )}
                        {film.directors.length > 0 && film.year && (
                          <>&nbsp;en {film.year}</>
                        )}
                        {!film.directors.length > 0 && film.year && (
                          <>{film.year}</>
                        )}
                      </Typography>
                    </div>
                  )}
                  {film.countries.length > 0 && (
                    <div className={classes.details}>
                      <Typography paragraph>
                      {displayArrayItems(film.countries)}
                      </Typography>
                    </div>
                  )}
                  {film.actors.length > 0 && (
                    <div className={classes.details}>
                      <Typography paragraph>
                        Avec {displayArrayItems(film.actors)}.
                      </Typography>
                    </div>
                  )}
                  {film.scoreComposer && (
                    <div className={classes.details}>
                      <Typography paragraph>
                        Musique de {film.scoreComposer}
                      </Typography>
                    </div>
                  )}
                  {film.genres.length > 0 && (
                    <div className={classes.details}>
                      <Typography paragraph>
                        Genres: {displayArrayItems(film.genres)}.
                      </Typography>
                    </div>
                  )}
                  {film.summary && (
                    <Typography
                      paragraph
                      className={`${classes.summary} ${classes.details} `}
                    >
                      {film.summary}
                    </Typography>
                  )}
                  <Grid container style={{ padding: '10px' }}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={2}>
                      {film.seen && (
                        <VisibilityIcon style={{ color: '#2980b9' }} />
                      )}
                      {!film.seen && (
                        <VisibilityOffIcon style={{ color: '#2980b9' }} />
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      {film.score && (
                        <div>
                          <Rating
                            name="read-only"
                            value={+film.score}
                            readOnly
                            precision={0.5}
                            max={3}
                          />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary" onClick={handleDelete}>
                    <DeleteIcon fontSize="small" /> Supprimer
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Form film={film} />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default FilmCard;
