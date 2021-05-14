import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PasswordIcon from '@material-ui/icons/LockOutlined';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

import AuthService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { resetFilms } from '../../actions/films';
import PasswordReset from '../authentication/PasswordReset';

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    marginLeft: '33%',
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
                  <Button title="Mot de passe" onClick={handleOpen} style={{padding: 0}}>
                    <PasswordIcon style={{ color: 'white' }} />
                  </Button>
                )}

                <Button title="Déconnexion" onClick={logout} style={{padding: 0}}>
                  <LogoutIcon style={{ color: 'white' }} />
                </Button>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <PasswordReset handleClose={handleClose} />
        </Fade>
      </Modal>
    </>
  );
};

export default Header;
