import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isOpen: true,
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      isOpen: false,
    })
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Dialog open={isOpen} onClose={this.handleClose}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your new [ WHATEVER FIELD ] below.
              <br />
              Click 'Confirm' to save your changes, or 'Cancel' to exit out.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleClose}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default EditProfile;