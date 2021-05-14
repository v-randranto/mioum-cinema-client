import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

import AuthService from '../../services/authService';

const statusInit = {
  isSuccessful: false,
  isFailed: false,
  errMessage: 'Confirmation différente',
  infoMessage: 'Mot de passe modifié',
};

const PasswordReset = () => {
  const classes = useStyles();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(statusInit);

  const handleSubmit = async (e) => {
    e.preventDefault();

    AuthService.resetPassword(password).then(
      async (res) => {
        await setStatus((state) => ({ ...state, isSuccessful: true }));
      },
      (error) => {
        setStatus((state) => ({ ...state, isFailed: true }));
      }
    );
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h5">
          Changer le mot de passe
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          size="small"
          name="password"
          label="Nouveau mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          size="small"
          name="confirmPassword"
          label="Confirmation"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        {status.isFailed && <Alert severity="error">{status.errMessage}</Alert>}
        {status.isSuccessful && (
          <Alert severity="success">{status.infoMessage}</Alert>
        )}
      </form>
    </Paper>
  );
};

export default PasswordReset;
