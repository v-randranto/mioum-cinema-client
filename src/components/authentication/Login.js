import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import Grid from '@material-ui/core/Grid';
import { brown } from '@material-ui/core/colors';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import AuthService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: brown[100],
  },

  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[500],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const statusInit = {
  isSuccessful: false,
  isFailed: false,
  errMessage: '',
};

const Login = () => {
  const {currentUser, setCurrentUser} = useAuth()
  const classes = useStyles();
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(statusInit);

  // const { currentSession } = AuthService;
  const history = useHistory();
  if (currentUser?.pseudo) {
    history.replace('/home');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    AuthService.login({ pseudo, password }).then(
      async (res) => {
        await setStatus((state) => ({ ...state, isSuccessful: true }));
        await setCurrentUser({pseudo: res.pseudo, role: res.role})
        history.push('/home');
      },
      (error) => {
        setStatus({
          isSuccessful: false,
          isFailed: true,
          errMessage: 'identifiants incorrects',
        });
      }
    );
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={4} lg={3} elevation={6}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Se connecter
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Pseudo"
              name="pseudo"
              autoFocus
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Envoyer
            </Button>
            {status.isFailed && (
              <Alert severity="error">{status.errMessage}</Alert>
            )}
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={5} md={8} lg={9} className={classes.image} />
    </Grid>
  );
};

export default Login;
