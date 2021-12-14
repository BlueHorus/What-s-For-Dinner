import React from "react";
import axios from "axios";
import defaultPic from "./shared/SVGS/profileIcon.svg";
import EditProfile from "./EditProfile.js";
import { app } from "../../firebase_config.js";
import {
  getAuth,
  onAuthStateChanged,
  updateCurrentUser,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";

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
      selectedFile: defaultPic,
      url: "",
      changingPassword: false,
      changingUsername: false,
      newPass: "",
      newUsername: "",
      // editingProfile: false,
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeDiet = this.changeDiet.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
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
      diet: userInfo.diet,
      intolerances: userInfo.intolerances.split(", "),
    });
  }

  handleUsernameChange() {
    this.setState({
      changingUsername: true,
    });
  }

  handlePasswordChange() {
    this.setState({
      changingPassword: true,
    });
  }

  passwordInput(e) {
    this.setState({
      newPass: e.target.value,
    });
  }

  usernameInput(e) {
    this.setState({
      newUsername: e.target.value,
    });
  }

  uploadUsername(e) {
    event.preventDefault();
    this.setState({
      changingUsername: false,
    });
    this.props.handleButtonPress({
      // uid: 2,
      newUsername: this.state.newUsername,
    });
  }

  changePassword() {
    event.preventDefault();
    const auth = getAuth(app);
    const user = auth.currentUser;
    updatePassword(user, this.state.newPass)
      .then(() => {
        console.log("password changed!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeProfilePic() {
    this.setState({
      changingProfilePic: true,
    });
  }

  handleURLChange(e) {
    this.setState({
      url: e.target.value,
    });
  }

  uploadPic(e) {
    this.setState({
      selectedFile: this.state.url ? this.state.url : defaultPic,
      changingProfilePic: false,
    });
    this.props.handleButtonPress({
      // uid: 2,
      newProfilePic: this.state.url,
    });
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit(e) {
    const { intolerances, value } = this.state;
    event.preventDefault();
    this.setState({
      intolerances: [...intolerances, value],
      value: "",
    });
  }

  changeDiet(e) {
    const { diet, userInfo } = this.state;
    event.preventDefault();
    this.props.handleButtonPress({
      // uid: userInfo.uid,
      diet: diet,
    });
    this.setState({
      dietChanged: true,
    });
  }

  handleDropdownChange(e) {
    this.setState({
      diet: e.target.value,
    });
  }

  deleteFood(e) {
    const { intolerances } = this.state;
    this.setState({
      intolerances: intolerances.filter((food) => {
        return food !== e.target.value;
      }),
    });
  }

  render() {
    const {
      value,
      diet,
      intolerances,
      changingProfilePic,
      url,
      userInfo,
      changingPassword,
      changingUsername,
      newUsername,
      newPass,
    } = this.state;

    const intoleranceList = [
      "dairy",
      "egg",
      "gluten",
      "grain",
      "peanut",
      "seafood",
      "sesame",
      "shellfish",
      "soy",
      "sulfite",
      "tree nut",
      "wheat",
    ];
    const dietsList = [
      "gluten free",
      "ketogenic",
      "vegetarian",
      "lacto-vegetarian",
      "obo-vegetarian",
      "vegan",
      "pescetarian",
      "paleo",
      "primal",
      "whole30",
    ];
    return (
      <div className="profile">
        <div className="welcome-banner">
          Welcome Back, <b>{userInfo.userName}!</b>
        </div>
        <div className="profile-left">
          <div className="profile-pic-block">
            <img
              className="profile-pic"
              src={this.state.selectedFile}
              alt="profile-picture"
            />
            <button
              className="button-change-pic"
              onClick={this.changeProfilePic}
            >
              x
            </button>
          </div>
          {changingProfilePic === true ? (
            <form className="url-form" onSubmit={this.uploadPic}>
              <label>
                Please enter new photo URL
                <br />
                <input
                  type="text"
                  value={url}
                  onChange={this.handleURLChange}
                />
              </label>
              <input type="submit" value="Upload" />
            </form>
          ) : null}

          <button
            className="button-change-name"
            onClick={this.handleUsernameChange}
          >
            Change Username
          </button>
          <br />
          <button
            className="button-change-pw"
            onClick={this.handlePasswordChange}
          >
            Change Password
          </button>

          {changingUsername === true ? (
            <div className="username-form">
              <label>
                Please enter new username:
                <br />
                <input
                  type="text"
                  value={newUsername}
                  onChange={this.usernameInput}
                />
              </label>
              <button className="username-form" onClick={this.uploadUsername}>
                Confirm!
              </button>
            </div>
          ) : null}

          {changingPassword === true ? (
            <div className="password-form">
              <label>
                Please enter new password:
                <br />
                <input
                  type="text"
                  value={newPass}
                  onChange={this.passwordInput}
                />
              </label>
              <button onClick={this.changePassword}>Confirm!</button>
            </div>
          ) : null}

          {changingPassword === true ? (
            <div className="password-form">
              <label>
                Please enter new password:
                <br />
                <input
                  type="text"
                  value={newPass}
                  onChange={this.passwordInput}
                />
              </label>
              <input
                type="submit"
                value="Confirm"
                onClick={this.changePassword}
              />
            </div>
          ) : null}
        </div>

        <div className="profile-right">
          {this.state.dietChanged ? (
            <div style={{ color: "green" }}>
              <b>Successfully saved new diet!</b>
            </div>
          ) : null}
          <br />
          <div className="diet">
            My Current Diet: <b>{diet}</b>
          </div>

          <form className="update-diet" onSubmit={this.changeDiet}>
            <label>
              Change your diet in the dropdown below!
              <br />
              <select value={diet} onChange={this.handleDropdownChange}>
                <option default> - </option>
                {dietsList.map((diet) => {
                  return <option value={diet}>{diet}</option>;
                })}
              </select>
            </label>
            <input type="submit" value="Confirm" />
          </form>

          <div className="intolerance-list">
            My Current Intolerances:
            {intolerances.map((food) => {
              return (
                <div className="intolerance-tile">
                  <span className="intolerance">
                    <b>{food}</b>
                  </span>
                  <button
                    className="button-delete-intolerance"
                    value={food}
                    onClick={this.deleteFood}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>

          <form className="intolerance-form" onSubmit={this.handleSubmit}>
            <label>
              Enter any food intolerances below
              <br />
              <select value={value} onChange={this.handleChange}>
                <option default> - </option>
                {intoleranceList.map((intolerance) => {
                  return <option value={intolerance}>{intolerance}</option>;
                })}
              </select>
            </label>
            <input type="submit" value="Add" />
          </form>

          <br />
          <button
            className="update-intolerances"
            onClick={(e) =>
              this.props.handleButtonPress({
                // uid: userInfo.uid,
                intolerances: intolerances.join(","),
              })
            }
          >
            Confirm Intolerance Changes!
          </button>
        </div>
      </div>
    );
  }
}

export default MyProfile;
