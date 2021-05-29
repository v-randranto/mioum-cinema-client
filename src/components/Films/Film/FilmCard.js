import React from 'react';
import {
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Grid,
  Typography,
  Link,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Rating from '@material-ui/lab/Rating';

import displayArrayItems from '../../../utils/displayArrayItems';
import useStyles from './styles';
import defaultImage from '../../../images/default_picture.jfif';

const FilmCard = ({ film, close }) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.mainContainer}
      container
      justify="space-around"
      alignItems="stretch"
      spacing={3}
      style={{ padding: '20px 0' }}
    >
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={film.title}
            subheader={film.originalTitle}
            action={
          <IconButton aria-label="close" size="small">
            <CloseIcon onClick={close} style={{fontSize: "1rem", color: "white"}}/>
          </IconButton>
        }
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
                  {!film.directors.length > 0 && film.year && <>{film.year}</>}
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
                {film.seen && <VisibilityIcon style={{ color: '#2980b9' }} />}
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
            {film.links.length > 0 && (
              <>
                {film.links.map((link, i) => (
                  <div key={i} className={classes.details}>
                  <Typography paragraph>
                    <Link href={link} target="_blank" rel="noreferrer">
                      {link}
                    </Link>
                  </Typography>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FilmCard;
