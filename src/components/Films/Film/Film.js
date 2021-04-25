import React from 'react';
import { useHistory } from 'react-router-dom';
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
  },
  cardContent: {
    flexGrow: 1,
    padding: '10px',
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
    '&:hover': {
      cursor: 'pointer',
      pointerEvents: 'auto',
    },
  },
  cardActions: {
    padding: '0 8px 8px 8px',
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
}));

const Film = ({ film, setCurrentId, open, handleOpen }) => {
  const history = useHistory();
  const classes = useStyles();
  const handleView = () => {
    setCurrentId(film._id);
    history.push(`/film-card/${film._id}`);
  };
  const handleUpdate = () => {
    handleOpen();
    setCurrentId(film._id);
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={film.selectedFile || defaultImage}
        title="Photo du film"
        onClick={handleView}
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
          style={{ padding: '10px 0' }}
        >
        <Grid item xs={4}></Grid>
          <Grid item xs={2}>
            {film.seen && (
              <VisibilityIcon style={{color: "#2980b9", fontSize: "1.2rem"}}/>
            )}
            {!film.seen && (
              <VisibilityOffIcon style={{color: "#2980b9", fontSize: "1.2rem"}}/>
            )}
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
                  style={{fontSize: "1.2rem"}}
                />
              </div>
            )}
          </Grid>
        </Grid>
        <CardActions className={classes.cardActions}>
          <Button
            style={{ fontSize: '0.7rem', paddingBottom: 0 }}
            color="primary"
            onClick={handleView}
          >
            Voir
          </Button>
          <Button
            style={{ fontSize: '0.7rem', paddingBottom: 0 }}
            color="primary"
            onClick={handleUpdate}
          >
            Modifier
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Film;
