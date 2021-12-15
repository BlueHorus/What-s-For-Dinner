import React from 'react';

// class EditProfile extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       newPass: '',
//       newUsername: '',
//     }
//   }



//   render() {
//     return(
//       <div></div>
//     );
//   }
// }

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function EditProfile(props) {

  return (
    <div>
      <Dialog open={open} /*onClose={}*/>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
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
          <Button>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfile;