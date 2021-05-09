import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = ({ onConfirm, setOpenDialog, openDialog }) => {
  const confirmDelete = () => {
    setOpenDialog(false);
    onConfirm();
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{"Je supprime, t'es sûr ?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Non
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
