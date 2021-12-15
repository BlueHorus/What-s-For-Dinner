import React from 'react';
import axios from 'axios';
import defaultPic from './shared/SVGS/profileIcon.svg';
import EditProfile from './EditProfile.js';
import { app } from "../../firebase_config.js";
import { getAuth, onAuthStateChanged, updateCurrentUser, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";
import Button from '@mui/material/Button';
import FaceIcon from '@mui/icons-material/Face';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';


class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
      value: '',
      diet: '',
      dietChanged: false,
      intolerances: [],
      changingProfilePic: false,
      selectedFile: defaultPic,
      url: '',
      changingPassword: false,
      changingUsername: false,
      newPass: '',
      newUsername: '',
      editingProfile: false,
    };

    this.setUserInfo = this.setUserInfo.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.passwordInput = this.passwordInput.bind(this);
    this.usernameInput = this.usernameInput.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
    this.uploadUsername = this.uploadUsername.bind(this);
    this.handleIntoleranceChange = this.handleIntoleranceChange.bind(this);
    this.changeDiet = this.changeDiet.bind(this);
    this.handleDietChange = this.handleDietChange.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  componentDidMount() {
    this.setUserInfo(this.props.userInfo);
  }

  setUserInfo(info) {
    const { userInfo } = this.props;
    this.setState({
      userInfo: info,
      // selectedFile: userInfo.profilePic ? userInfo.profilePic : defaultPic,
      selectedFile: defaultPic,
      diet: userInfo.diet ? userInfo.diet : 'No diet selected',
      intolerances: userInfo.intolerances ? userInfo.intolerances.split(', ') : [],
    })
  }

  handleUsernameChange() {
    this.setState({
      changingUsername: true,
      changingPassword: false,
      changingProfilePic: false,
    })
  }

  handlePasswordChange() {
    this.setState({
      changingPassword: true,
      changingUsername: false,
      changingProfilePic: false,
    })
  }

  passwordInput(e) {
    this.setState({
      newPass: e.target.value,
    })
  }

  usernameInput(e) {
    this.setState({
      newUsername: e.target.value,
    })
  }

  uploadUsername(e) {
    event.preventDefault();
    this.setState({
      changingUsername: false,
    });
    this.props.handleButtonPress(
      {
        // uid: 2,
        newUsername: this.state.newUsername,
      }
    );
  }

  changePassword() {
    event.preventDefault();
    const auth = getAuth(app);
    const user = auth.currentUser;
    updatePassword(user, this.state.newPass)
      .then(() => {
        console.log('password changed!');
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      changingPassword: false,
    })
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
    })
  }

  uploadPic(e) {
    this.setState({
      selectedFile: this.state.url ? this.state.url : defaultPic,
      changingProfilePic: false,
    });
    this.props.handleButtonPress(
      {
        // uid: 2,
        newProfilePic: this.state.url,
      }
    );
  }

  handleIntoleranceChange(e) {
    const { intolerances, value } = this.state;
    this.setState({
      intolerances: [...intolerances, e.target.value],
      value: '',
    })
  }

  changeDiet(e) {
    const { diet, userInfo } = this.state;
    event.preventDefault();
    this.props.handleButtonPress(
      {
        // uid: userInfo.uid,
        diet: diet,
      }
    );
    this.setState({
      dietChanged: true,
    })
  }

  handleDietChange(e) {
    this.setState({
      diet: e.target.value,
    })
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

  render() {
    const { value, diet, intolerances, changingProfilePic, url, userInfo, changingPassword, changingUsername, newUsername, newPass, editingProfile } = this.state;

    const intoleranceList = ['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'];
    const dietsList = ['gluten free', 'ketogenic', 'vegetarian', 'lacto-vegetarian', 'obo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'whole30'];


    return (
      <div className="profile">
        {editingProfile === true ? <EditProfile /> : null}
        <div className="welcome-banner">Welcome Back, <b>{userInfo.userName}!</b></div>
        <div className="profile-third">
          <div className="profile-pic-block">
            <img className="profile-pic" src={this.state.selectedFile} alt="profile-picture" />
            <Button sx={{width: '20px', borderRadius: '50%'}} id="button-change-pic" startIcon={<FaceIcon />}  variant='contained' onClick={this.changeProfilePic}></Button>
          </div>
          {changingProfilePic === true
            ? <div className="url-form">
                Please enter new photo URL
                <br />
                <input type="text" value={url} onChange={this.handleURLChange}/>
                <button onClick={this.uploadPic}>Upload</button>
              </div>
            : null
          }

          <Button style={{ fontSize: '12px' }} id="button-edit-profile" variant='contained' disabled="disabled"
           onClick={this.editProfile}>I don't work yet!</Button>

          <Button style={{ fontSize: '12px' }} id="button-change-name" variant='contained' onClick={this.handleUsernameChange}>Change Username</Button>
          <br />
          <Button style={{ fontSize: '12px' }} id="button-change-pw" variant='contained' onClick={this.handlePasswordChange}>Change Password</Button>

          {changingUsername === true
            ? (
              <div className="username-form">
                  <label>
                    Please enter new username:
                    <br />
                    <input type="text" value={newUsername} onChange={this.usernameInput} />
                  </label>
                  <button className="change-username" onClick={this.uploadUsername}>Confirm!</button>
                </div>
            )
            : null
          }

          {changingPassword === true
            ? (
              <div className="password-form">
                  <label>
                    Please enter new password:
                    <br />
                    <input type="text" value={newPass} onChange={this.passwordInput} />
                  </label>
                  <button onClick={this.changePassword}>Confirm!</button>
                </div>
            )
            : null
          }
        </div>

        <div className="diet-third">
          {this.state.dietChanged ? <div className="saved-diet-notif" style={{color: "salmon"}}><b>Successfully saved new diet!</b></div> : null}
          <br />
          <div className="diet-header">My Current Diet </div>
          <div className="diet-name"><b>{diet.toUpperCase()}</b></div>

          <form className="update-diet" onSubmit={this.changeDiet}>
            <div className="change-diet-text">Select a new diet in the dropdown below</div>
          <select value={diet} onChange={this.handleDietChange}>
            <option default> - </option>
            {dietsList.map(diet => {
              return <option value={diet}>{diet}</option>
            })}
          </select>
            <input className="button-send-diet" type="submit" value="Confirm" />
          </form>
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

          <form className="intolerance-form">
            Enter any food intolerances below
            <br />
            <select value={value} onChange={this.handleIntoleranceChange}>
              <option default> - </option>
              {intoleranceList.map(intolerance => {
                return <option value={intolerance}>{intolerance}</option>
              })}
            </select>
          </form>

          <br />
          <Button
            variant="contained"
            id="button-send-intolerances"
            onClick={(e) => this.props.handleButtonPress({
              // uid: userInfo.uid,
              intolerances: intolerances.join(','),
            })}
          >
            Confirm Changes!
          </Button>
        </div>
      </div>
    );
  }
}

export default MyProfile;