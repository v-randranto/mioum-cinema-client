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
import displayArrayItems from '../../../utils/displayArrayItems'
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
        {(film.directors.length > 0 || film.year) && (
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
              Réalisé      
            {film.directors.length > 0 &&           
             <> &nbsp;par {displayArrayItems(film.directors)}</>          
            }
            {film.year &&            
            <>&nbsp;en {film.year}</>
            }.
            </Typography>
            
          </div>
        )}
        {film.actors.length > 0 && (
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              Avec {displayArrayItems(film.actors)}.
            </Typography>
          </div>
        )}
        {film.genres.length > 0 && (
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              Genres: {displayArrayItems(film.genres)}.
            </Typography>
          </div>
        )}
        {film.summary && (
          <Typography
            className={`${classes.summary} ${classes.details} `}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {film.summary}
          </Typography>
        )}

        {film.score && (
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              Note de {film.score}/10
            </Typography>
          </div>
        )}
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
