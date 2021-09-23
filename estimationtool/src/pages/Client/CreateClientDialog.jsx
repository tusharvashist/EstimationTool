import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CreateClientDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Client
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter client information 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Client Name"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Client Email"
            type="email"
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Client Description"
            type="name"
            fullWidth
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
