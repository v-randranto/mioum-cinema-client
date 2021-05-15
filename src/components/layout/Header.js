import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PasswordIcon from '@material-ui/icons/LockOutlined';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DraggableComponent from '../shared/DraggableComponent';

import AuthService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { resetFilms } from '../../actions/films';
import PasswordReset from '../authentication/PasswordReset';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'space-between',
  },
  appBar: {
    backgroundColor: '#34465d',
    color: 'white',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  dialog: {
    width: '20%',
    marginLeft: '33%',
  },
  avatar: {
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main,
  },
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
          <Typography variant="h6" noWrap>
            Mioum Cinema
          </Typography>

          {currentUser?.pseudo && (
            <>
              <Typography noWrap>Salut {currentUser.pseudo}</Typography>
              <div>
                {currentUser.role !== 'guest' && (
                  <Button
                    title="Mot de passe"
                    onClick={handleOpen}
                    style={{ padding: 0 }}
                  >
                    <PasswordIcon style={{ color: 'white' }} />
                  </Button>
                )}

                <Button
                  title="Déconnexion"
                  onClick={logout}
                  style={{ padding: 0 }}
                >
                  <LogoutIcon style={{ color: 'white' }} />
                </Button>
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
        <DialogTitle
          style={{ cursor: 'move' }}
          id="draggable-component-title"
        >
              <Avatar className={classes.avatar}>
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
