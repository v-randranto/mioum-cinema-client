import React, { useState, useReducer } from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';

import AuthService from '../../services/authService';
import statusReducer from '../../reducers/status';

const statusInit = {
  isLoading: '',
  isSuccessful: false,
  isFailed: false,
  errMessage: '',
  infoMessage: '',
};

const PasswordReset = () => {
  const classes = useStyles();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState(false)
  const [status, dispatch] = useReducer(statusReducer, statusInit);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmError(false)

    if (password === confirmPassword) {
      AuthService.resetPassword(password).then(
        async (res) => {
          await dispatch({ type: 'success', message: 'Mot de passe modifié' });
        },
        (error) => {
          dispatch({ type: 'failure', message: error.message });
        }
      );
    } else {
      setConfirmError(true)
    }
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
        helperText="4 à 10 caractères"
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
        error={confirmError}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        className={classes.button}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        margin="normal"
        disabled={status.isLoading}
      >
        Envoyer
      </Button>
      {status.isFailed && <Alert severity="error">{status.errMessage}</Alert>}
      {status.isSuccessful && (
        <Alert severity="success">{status.infoMessage}</Alert>
      )}
      {status.isLoading && <CircularProgress size="30" thickness="2" />}
    </form>
  );
};

export default PasswordReset;
