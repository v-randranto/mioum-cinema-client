import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
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
    <form
      autoComplete="off"
      noValidate
      className={`${classes.root} ${classes.form}`}
      onSubmit={handleSubmit}
    >
      <TextField
        variant="outlined"
        required
        fullWidth
        name="password"
        label="Nouveau mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant="outlined"
        required
        fullWidth
        name="confirmPassword"
        label="Confirmation"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button className={classes.button}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        margin="normal"
      >
        Envoyer
      </Button>
      {status.isFailed && <Alert severity="error">{status.errMessage}</Alert>}
      {status.isSuccessful && (
        <Alert severity="success">{status.infoMessage}</Alert>
      )}
    </form>
  );
};

export default PasswordReset;
