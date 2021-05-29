import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import DraggableComponent from '../../shared/DraggableComponent'

const ConfirmDialog = ({ onConfirm, setOpenDialog, openDialog, filmTitle}) => {
  const confirmDelete = () => {
    setOpenDialog(false);
    onConfirm();
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperComponent={DraggableComponent}
      >
        <DialogTitle style={{ cursor: 'move', padding: "5px 15px" }} id="draggable-component-title">{filmTitle}</DialogTitle>
        <Divider />
        <DialogContent>
          Je vais supprimer ce film, t'es sûr?
        </DialogContent>
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
