import React from "react";
import axios from "axios";
import Auth from "./login.jsx";
import { app } from "../../firebase_config.js";
import { getAuth, onAuthStateChanged, updateCurrentUser } from "firebase/auth";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: "",
      login: false,
      token: "",
      authenticated: false,
    };
    this.getStatus = this.getStatus.bind(this);
  }
  componentDidMount() {
    this.getStatus();
  }

  //show whether user is login in or not
  getStatus(func) {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ uid: user.uid });
        this.setState({ login: true });
        auth.currentUser
          .getIdToken()
          .then((id) => {
            this.setState({ token: id });
          })
          .then(func)
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.setState({ login: false });
        console.log("Not sign in");
      }
    });
  }
  //run get token to get the ID token from firebase and sent them back to the server for
  // verification
  gettoken() {
    if (this.state.uid !== "") {
      currentUser
        .getIdToken()
        .then((id) => {
          console.log(id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // call this function to validate user request before going to "my recipt/ my incredient"
  //need to comeback to test this function with funcitonal api end points
  getAuthentication() {
    if (this.state.uid === "") {
      console.log("Please Sign in first");
    } else {
      axios
        .get("/authenticate", {
          headers: {
            Authorization: this.state.token + " " + this.state.uid,
          },
        })
        .then((response) => {
          response.data === "successfully authenticated"
            ? this.setState({ authenticated: true })
            : this.setState({ authenticated: false });
        });
    }
  }

  render() {
    return (
      <div>
        <Auth status={this.getStatus} login={this.state.login} />
        <h1>Hello Blue Ocean World!</h1>
      </div>
    );
  }
}

export default Main;
