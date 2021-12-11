import React from "react";
import { app } from "../../firebase_config.js";
import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      create: false,
      signin: false,
      click: false,
      uid: "",
      url: "",
    };
    this.click = this.click.bind(this);
    this.submit = this.submit.bind(this);
    this.createUser = this.createUser.bind(this);
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
  }

  //logic to switch to different forms
  click(e) {
    if (e.target.innerHTML === "Log In") {
      this.setState({ click: true });
      this.setState({ signin: true });
      this.setState({ create: false });
    }
    if (e.target.innerHTML === "Sign Up") {
      this.setState({ click: true });
      this.setState({ create: true });
      this.setState({ signin: false });
    }
  }

  submit(e, item) {
    this.setState({ [item]: e.target.value });
  }

  //create an user
  //need to test the post request part
  createUser() {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((info) => {
        this.setState({ uid: info.user.uid });
        // axios.post("/createUser", {
        //   uid: this.state.uid,
        //   username: this.state.username,
        //   url: this.state.url,
        // });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  //sign in
  signin() {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((user) => {
        this.props.status();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  //sign out
  signout() {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        console.log("sign out");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.click}>Log In</button>
        <button onClick={this.click}>Sign Up</button>
        <button onClick={this.signout}>Sign Out</button>
        {this.state.click === true ? (
          <div className="modal">
            <input
              onChange={(e) => {
                this.submit(e, "email");
              }}
              placeholder="Email"
            />

            {this.state.create === true ? (
              <input
                onChange={(e) => {
                  this.submit(e, "username");
                }}
                placeholder="Username"
              />
            ) : (
              ""
            )}

            {this.state.create === true ? (
              <input
                onChange={(e) => {
                  this.submit(e, "url");
                }}
                placeholder="Photo URL"
              />
            ) : (
              ""
            )}

            <input
              onChange={(e) => {
                this.submit(e, "password");
              }}
              placeholder="Password"
            />
            {this.state.create === false ? (
              <button onClick={this.signin}>Sign In</button>
            ) : (
              <button onClick={this.createUser}>Create</button>
            )}

            {this.state.create === true ? (
              <div>
                Already have an account? <u onClick={this.click}>Log In</u>
              </div>
            ) : (
              <div>
                Don't have an account? <u onClick={this.click}>Sign Up</u>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Auth;
