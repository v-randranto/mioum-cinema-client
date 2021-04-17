import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Create';
import { useDispatch } from 'react-redux';
import { deleteFilm } from '../../../actions/films';
import useStyles from './styles';

const Film = ({ film, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          film.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={film.title}
      />

      <CardContent>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {film.title}
        </Typography>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            Réalisé par {film.director}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            Avec {film.actors.map((actor) => `${actor},`)}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            Genres: {film.genres.map((genre) => `${genre},`)}
          </Typography>
        </div>
        <Typography
          className={classes.summary}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {film.summary}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => setCurrentId(film._id)}
        >
          <UpdateIcon fontSize="default" />
          Modifier
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteFilm(film._id))}
        >
          <DeleteIcon fontSize="small" /> Supprimer
        </Button>
      </CardActions>
    </Card>
  );
};

export default Film;
