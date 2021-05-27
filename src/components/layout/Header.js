import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DraggableComponent from '../shared/DraggableComponent';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import MovieIcon from '@material-ui/icons/Theaters';
import PasswordIcon from '@material-ui/icons/LockOutlined';

import AuthService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { resetFilms } from '../../actions/films';
import PasswordReset from '../authentication/PasswordReset';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  // root: {
    // justifyContent: 'space-between',
  // },
  appBar: {
    backgroundColor: '#34465d',
    color: 'white',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  dialog: {
    width: '22%',
    marginLeft: '33%',
  },
  avatarPwd: {
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main,
    height: "40px",
    width: "40px"
  },
  avatarAppli: {
    color: "black",
    backgroundColor: "white",
    borderRadius: "3px",
    
    marginRight: '10px',
    height: "25px",
    width: "25px"
   
  },
  appli: {
    flexGrow: 1
  },
  user: {
    flexGrow: 1
  }
}));

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    AuthService.logout();
    dispatch(resetFilms());
    setCurrentUser();
    history.push('/login');
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.root} variant="dense">
          <Avatar className={classes.avatarAppli}>
            <MovieIcon />
          </Avatar>
          <Typography variant="h6" className={classes.appli}>
            Mioum Cinema
          </Typography>

          {currentUser?.pseudo && (
            <>
              <Typography className={classes.user}>Salut {currentUser.pseudo}</Typography>
              <div>
                {currentUser.role !== 'guest' && (
                  <IconButton
                    title="Mot de passe"
                    onClick={handleOpen}
                  >
                    <PasswordIcon style={{ color: 'white' }} />
                  </IconButton>
                )}

                <IconButton
                  title="Déconnexion"
                  onClick={logout}
                >
                  <LogoutIcon style={{ color: 'white' }} />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        PaperComponent={DraggableComponent}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-component-title">
          <Avatar className={classes.avatarPwd}>
            <LockOutlinedIcon />
          </Avatar>
        </DialogTitle>
        <DialogContent>
          <PasswordReset handleCloseForm={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
