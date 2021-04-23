import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import displayArrayItems from '../../../utils/displayArrayItems';
import defaultImage from '../../../images/default_picture.jfif';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
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
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="subtitle1" gutterBottom>
          {film.title}
        </Typography>
        {(film.directors.length > 0 || film.year) && (
          <Typography variant="subtitle2">
            {film.directors.length > 0 && (
              <>{displayArrayItems(film.directors)}</>
            )}
            {film.year && <>&nbsp;{film.year}</>}
          </Typography>
        )}
        {film.score && (
          <div style={{textAlign: "center", marginTop: "5px"}}>
            <Rating
              name="read-only"
              value={film.score}
              size="small"
              readOnly
              precision={0.5}
            />
          </div>
        )}
        <CardActions>
          <Button size="small" color="primary" onClick={handleView}>
            Voir
          </Button>
          <Button size="small" color="primary" onClick={handleUpdate}>
            Modifier
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Film;
