import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import displayArrayItems from '../../../utils/displayArrayItems';
import defaultImage from '../../../images/default_picture.jfif';
import { deleteFilm } from '../../../actions/films';
import { setCurrentId, resetCurrentId } from '../../../actions/currentId';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmDialog from './ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    '&:hover': {
      cursor: 'pointer',
      pointerEvents: 'auto',
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: '10px',
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  cardActions: {
    padding: '0 0 8px 0',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
  },
  detailTitle: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  detailDirector: {
    fontSize: '0.8rem',
  },
  seenIcon: {
    color: '#2980b9',
    fontSize: '1.2rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%',
    marginLeft: '33%',
  },
}));

const Film = (props) => {
  const { film, handleOpen, showFilmCard } = props;
  const { currentUser } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentId(film._id));
    showFilmCard();
  };

  const handleDelete = () => {
    dispatch(resetCurrentId());
    dispatch(deleteFilm(film._id));
  };

  const handleUpdate = () => {
    handleOpen();
    dispatch(setCurrentId(film._id));
  };
  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={film.photoUrl || defaultImage}
          title="Photo du film"
          onClick={handleClick}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.detailTitle}>{film.title}</Typography>
          {(film.directors.length > 0 || film.year) && (
            <Typography className={classes.detailDirector}>
              {film.directors.length > 0 && (
                <>{displayArrayItems(film.directors)}</>
              )}
              {film.year && <>&nbsp;{film.year}</>}
            </Typography>
          )}

          <Grid
            container
            direction="row"
            justify-content="space-between"
            align-items="center"
            align-content="center"
            style={{ padding: '5px 0' }}
          >
            <Grid item xs={3}></Grid>
            <Grid item xs={2}>
              {film.seen && <VisibilityIcon className={classes.seenIcon} />}
              {!film.seen && <VisibilityOffIcon className={classes.seenIcon} />}
            </Grid>
            <Grid item xs={4}>
              {film.score && (
                <div style={{ textAlign: 'center' }}>
                  <Rating
                    name="read-only"
                    value={+film.score}
                    readOnly
                    precision={0.5}
                    max={3}
                    style={{ fontSize: '1.2rem' }}
                  />
                </div>
              )}
            </Grid>
          </Grid>

          {currentUser.role !== 'guest' && (
            <CardActions className={classes.cardActions}>
              <Button
                style={{ fontSize: '0.7rem', paddingBottom: 0 }}
                color="primary"
                onClick={handleUpdate}
              >
                Modifier
              </Button>
              <Button
                style={{ fontSize: '0.7rem', paddingBottom: 0 }}
                color="primary"
                onClick={() => setOpenDialog(true)}
              >
                Supprimer
              </Button>
            </CardActions>
          )}
        </CardContent>
      </Card>
      {openDialog && (
        <ConfirmDialog
          onConfirm={handleDelete}
          setOpenDialog={setOpenDialog}
          openDialog={openDialog}
        />
      )}
    </>
  );
};

export default Film;
