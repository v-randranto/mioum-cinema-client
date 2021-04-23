import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MovieIcon from '@material-ui/icons/Movie';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  appBar: { 
      backgroundColor: grey[800],
      color: 'white'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="sticky" className={classes.appBar} >
      <Toolbar className={classes.root} variant="dense">
        <MovieIcon className={classes.icon} />
        <Typography variant="h6" noWrap>
          Mioum Cinema
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
