import React from "react";
import { app } from "../../../firebase_config.js";
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
    this.renderModal = this.renderModal.bind(this);
  }

  //logic to switch to different forms
  click(e) {
    if (e.target.className === "login") {
      this.setState({
        click: true,
        signin: true,
        create: false,
      });
    }
    if (e.target.className === "signup") {
      this.setState({
        click: true,
        create: true,
        signin: false,
      });
    }
  }

  submit(e, item) {
    this.setState({ [item]: e.target.value });
  }

  //create an user
  //need to test the post request part
  createUser(e) {
    if (this.props.login === true) {
      this.signout();
    } else {
      event.preventDefault();
      console.log("invoking this");
      const auth = getAuth(app);
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((info) => {
          this.setState({ uid: info.user.uid });
          console.log(this.state.uid);

          // axios.post("/createUser", {
          //   uid: this.state.uid,
          //   username: this.state.username,
          //   url: this.state.url,
          // });
          alert("Thanks you! ");
          e.target.reset();
          this.setState({ click: false });
        })
        .catch((err) => {
          alert("Please try again!" + err);
          console.log(err.message);
        });
    }
  }

  //sign in
  signin(e) {
    event.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((user) => {
        this.props.status(() => {
          alert("Welcome Back");
          e.target.reset();
          this.setState({ click: false });
        });
      })
      .catch((err) => {
        alert("Please try again");
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

  renderModal() {
    if (this.state.click === true) {
      if (this.state.create === true) {
        return (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <form
                onSubmit={
                  this.state.create === true ? this.createUser : this.signin
                }
              >
                <input
                  onChange={(e) => {
                    this.submit(e, "email");
                  }}
                  placeholder="Email"
                />
                <input
                  onChange={(e) => {
                    this.submit(e, "username");
                  }}
                  placeholder="Username"
                />
                <input
                  onChange={(e) => {
                    this.submit(e, "url");
                  }}
                  placeholder="Photo URL"
                />
                <input
                  onChange={(e) => {
                    this.submit(e, "password");
                  }}
                  placeholder="Password"
                />
                <button type="submit">Create</button>
              </form>
              <div>
                Already have an account?{" "}
                <u className="login" onClick={this.click}>
                  Log In
                </u>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="modal">
            <div className="modal-content">
              <form
                onSubmit={
                  this.state.create === true ? this.createUser : this.signin
                }
              >
                <input
                  onChange={(e) => {
                    this.submit(e, "email");
                  }}
                  placeholder="Email"
                />
                <input
                  onChange={(e) => {
                    this.submit(e, "password");
                  }}
                  placeholder="Password"
                />
                <button type="submit">Sign In</button>
              </form>

              <span> </span>
              <span>Forgot?</span>
              <div>
                Don't have an account?{" "}
                <u className="signup" onClick={this.click}>
                  Sign Up
                </u>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.login === false ? (
          <div>
            <button className="login" onClick={this.click}>
              Log In
            </button>
            <button className="signup" onClick={this.click}>
              Sign Up
            </button>
          </div>
        ) : (
          <button onClick={this.signout}>Sign Out</button>
        )}
        {this.renderModal()}
      </div>
    );
  }
}
export default Auth;
