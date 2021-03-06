import React from "react";
import axios from "axios";
import defaultPic from "./shared/SVGS/profileIcon.svg";
import { app } from "../../firebase_config.js";
import {
  getAuth,
  onAuthStateChanged,
  updateCurrentUser,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import Button from '@mui/material/Button';
import FaceIcon from '@mui/icons-material/Face';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ToolTip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
      value: "",
      diet: "",
      dietChanged: false,
      intolerances: [],
      changingProfilePic: false,
      url: "",
      photo: "",
      changingPassword: false,
      changingUsername: false,
      editingProfile: false,
      // FOR MODAL
      modalValue: '',
    };

    this.setUserInfo = this.setUserInfo.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
    this.handleIntoleranceChange = this.handleIntoleranceChange.bind(this);
    this.sendIntolerances = this.sendIntolerances.bind(this);
    this.changeDiet = this.changeDiet.bind(this);
    this.handleDietChange = this.handleDietChange.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.modalTextChange = this.modalTextChange.bind(this);
  }

  componentDidMount() {
    this.setUserInfo(this.props.userInfo);
  }

  setUserInfo(info) {
    const { userInfo } = this.props;
    this.setState({
      userInfo: info,
      photo: userInfo.profilePic ? userInfo.profilePic : defaultPic,
      diet: userInfo.diet ? userInfo.diet : '-',
      intolerances: userInfo.intolerances ? userInfo.intolerances.split(',') : [],
    })
  }

  handleUsernameChange() {
    this.setState({
      changingUsername: true,
      changingPassword: false,
      changingProfilePic: false,
      editingProfile: true,
    })
  }

  handlePasswordChange() {
    this.setState({
      changingPassword: true,
      changingUsername: false,
      changingProfilePic: false,
      editingProfile: true,
    })
  }

  changeProfile() {
    event.preventDefault();
    if (this.state.modalValue === '') {
      alert(`Please enter a valid ${this.state.changingPassword ? 'password' : 'username'}`);
    } else {
      if (this.state.changingPassword === true) {
        const auth = getAuth(app);
        const user = auth.currentUser;
        updatePassword(user, this.state.modalValue)
          .then(() => {
            console.log('password changed!');
          })
          .catch(err => {
            console.log(err);
          });
        this.setState({
          changingPassword: false,
          newPass: '',
          modalValue: '',
        });
        alert('Password changed!');
      }
      if (this.state.changingUsername === true) {
        this.setState({
          changingUsername: false,
          newUsername: '',
        });
        this.props.handleButtonPress({
          newUsername: this.state.modalValue,
        });
        alert('Username changed!');
      }
      this.setState({
        changingUsername: false,
        changingPassword: false,
        modalValue: '',
        editingProfile: false,
      })
    }
  }

  changeProfilePic() {
    this.setState({
      changingProfilePic: true,
      changingPassword: false,
      changingUsername: false,
    });
  }

  handleURLChange(e) {
    this.setState({
      url: e.target.value,
    });
  }

  uploadPic(e) {
    this.setState({
      photo: this.state.url === '' ? defaultPic : this.state.url,
      changingProfilePic: false,
    });
    this.props.handleButtonPress({
      newProfilePic: this.state.url,
    });
  }

  handleIntoleranceChange(e) {
    const { intolerances, value } = this.state;
    this.setState({
      intolerances: [...intolerances, e.target.value],
      value: '',
    })
  }

  sendIntolerances() {
    const { intolerances } = this.state;
    this.props.handleButtonPress({
      intolerances: intolerances.join(','),
    });
    alert('Successfully saved changes!');
  }

  changeDiet(e) {
    const { diet, userInfo } = this.state;
    event.preventDefault();
    this.props.handleButtonPress({
      diet: diet,
    });
    this.setState({
      dietChanged: true,
    });
  }

  handleDietChange(e) {
    this.setState({
      diet: e.target.value,
    });
  }

  deleteFood(inputFood) {
    const { intolerances } = this.state;
    this.setState({
      intolerances: intolerances.filter(food => {
        return food !== inputFood;
      })
    })
  }

  editProfile() {
    this.setState({
      editingProfile: true,
    })
  }

  handleClose() {
    this.setState({
      editingProfile: false,
    })
  }

  modalTextChange(e) {
    this.setState({
      modalValue: e.target.value,
    })
  }

  render() {
    const {
      value,
      diet,
      intolerances,
      changingProfilePic,
      url,
      photo,
      userInfo,
      changingPassword,
      changingUsername,
      newUsername,
      newPass,
      editingProfile,
      modalValue
    } = this.state;

    const intoleranceList = [
      'dairy',
      'egg',
      'gluten',
      'grain',
      'peanut',
      'seafood',
      'sesame',
      'shellfish',
      'soy',
      'sulfite',
      'tree nut',
      'wheat'
    ];
    const dietsList = [
      'gluten free',
      'ketogenic',
      'vegetarian',
      'lacto-vegetarian',
      'obo-vegetarian',
      'vegan',
      'pescetarian',
      'paleo',
      'primal',
      'whole30'
    ];

    const profileModal = (
      <Dialog open={editingProfile} onClose={this.handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your new {changingUsername ? 'username' : 'password'} below.
            <br />
            Click 'Confirm' to save your changes, or 'Cancel' to exit out.
            <br/>
            <br/>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={changingUsername ? "Username" : "Password"}
            type="text"
            fullWidth
            variant="standard"
            value={modalValue}
            onChange={this.modalTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button id="change-username" onClick={this.changeProfile}>Confirm</Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <>
      <div className="welcome-banner">Welcome Back,&nbsp;<b>{this.props.userInfo.userName}!</b></div>
      <div className="profile">
        {editingProfile ? profileModal : null}
        <div className="profile-third">
          <div className="profile-pic-block">
            <img
              className="profile-pic"
              src={photo}
              alt="profile-picture"
            />
            <ToolTip title="Edit photo" placement="right">
              <Button
                id="button-change-pic"
                startIcon={<FaceIcon />}
                variant='contained'
                onClick={this.changeProfilePic}
                >
              </Button>
            </ToolTip>
          </div>

          {changingProfilePic === true
            ? <div className="url-form">
                Please enter new photo URL
                <br />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Profile URL"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={url}
                  onChange={this.handleURLChange}
                />
                <Button
                  variant="contained"
                  id="button-change-url"
                  onClick={this.uploadPic}>
                    Upload
                </Button>
              </div>
            : null
          }

          <Button
            style={{ fontSize: '12px' }}
            id="button-change-name"
            variant='contained'
            onClick={this.handleUsernameChange}
          >
            Change Username
          </Button>

          <br />

          <Button
            style={{ fontSize: '12px' }}
            id="button-change-pw"
            variant='contained'
            onClick={this.handlePasswordChange}
          >
            Change Password
          </Button>
        </div>

        <div className="diet-third">
          {this.state.dietChanged
          ? <div
              className="saved-diet-notif"
              style={{color: "salmon"}}>
            <b>Successfully saved new diet!</b>
            </div>
          : null}

          <br />

          <div className="diet-header">My Current Diet </div>
          <div className="diet-name"><b>{diet.toUpperCase()}</b></div>

          <div className="change-diet-text">Select a new diet in the dropdown below</div>
          <FormControl id="update-diet">
            <InputLabel id="diet-form-label">Diet</InputLabel>
            <Select
              value={diet}
              label="Diet"
              onChange={this.handleDietChange}
            >
              <MenuItem value="">No diet</MenuItem>
              {dietsList.map(diet => {
                return <MenuItem value={diet}>{diet}</MenuItem>
              })}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            id="button-send-diet"
            onClick={this.changeDiet}
          >
            Confirm!
          </Button>
        </div>

        <div className="intolerance-third">
          <div className="intolerance-list">
            My Current Intolerances
            <List>
              {intolerances.map(food => {
                return (
                  <ListItem id="intolerance-tile" value={food}
                  secondaryAction={
                    <IconButton edge='end' onClick={()=> this.deleteFood(food)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  >
                    <ListItemText primary={food} required/>
                  </ListItem>
                )
              })
            }
            </List>
          </div>

          <div className="change-intol-text">Select more intolerances below</div>
          <FormControl id="intolerance-form">
            <InputLabel>Intolerance</InputLabel>
            <Select
              value={value}
              label="Intolerance"
              onChange={this.handleIntoleranceChange}
            >
              {intoleranceList.map(intolerance => {
                return <MenuItem value={intolerance}>{intolerance}</MenuItem>
              })}
            </Select>
          </FormControl>

          <br />
          <Button
            variant="contained"
            id="button-send-intolerances"
            onClick={this.sendIntolerances}
          >
            Confirm!
          </Button>
        </div>
      </div>
      </>
    );
  }
}

export default MyProfile;
