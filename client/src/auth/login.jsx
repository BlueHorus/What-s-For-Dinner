import React from "react";
import { app } from "../../../firebase_config.js";
import axios from "axios";
import logo from "../../../public/images/BlueOceanLogo.svg";
import Button from "@mui/material/Button";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendEmailVerification,
} from "firebase/auth";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

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
      token: "",
      url: "",
    };
    this.click = this.click.bind(this);
    this.submit = this.submit.bind(this);
    this.createUser = this.createUser.bind(this);
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.signinwihgoogle = this.signinwihgoogle.bind(this);
  }

  //logic to switch to different forms
  click(e) {
    if (e.target.id === "login") {
      this.setState({
        click: true,
        signin: true,
        create: false,
      });
    }
    if (e.target.id === "signup") {
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

  //use to verify email
  verifyEmail() {
    const auth = getAuth(app);
    const actionCodeSetting = {
      url: "http://localhost:3000",
      handleCodeInApp: true,
    };
    sendEmailVerification(auth.currentUser, actionCodeSetting)
      .then((res) => {
        alert("Email verification sent!");
      })

      .catch((err) => {
        console.log(err.message);
      });
  }
  //create an user
  //need to test the post request part
  createUser(e) {
    if (this.props.login === true) {
      this.signout();
    } else {
      event.preventDefault();
      const auth = getAuth(app);
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((info) => {
          this.setState({ token: info.user.accessToken });

          axios.post(
            "/createUser",

            {
              username: this.state.username,
              url: this.state.url,
            },
            {
              headers: {
                Authorization: this.state.token,
              },
            }
          );
        })
        .then(() => {
          alert("Thanks you! ");
          e.target.reset();
          this.setState({ click: false });
          this.verifyEmail();
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
        if (user.user.emailVerified === false) {
          alert("Please verify your email first");
          this.signout();
        } else {
          this.props.status(() => {
            alert("Welcome Back");
            e.target.reset();
            this.setState({ click: false });
          });
        }
      })
      .catch((err) => {
        alert("Please try again");
        console.log(err.message);
      });
  }

  signinwihgoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        this.props.status();
      })
      .catch((err) => console.log(err.message));
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
        // window.onclick = function(event) {
        //   if (event.target == modal) {
        //     document.getElementById('modal').style.display = 'none';
        //     this.setState({
        //       click: false,
        //     })
        //   }
        // }
        return (
          <div id="modal" className="modal">
            <div className="modal-content">
              <Button
                variant="contained"
                id="close"
                onClick={() => {
                  document.getElementById("modal").style.display = "none";
                  this.setState({
                    click: false,
                  });
                }}
              >
                X
              </Button>
              <img src={logo} className="logo" id="modal-logo" />
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
                <Button id="submit-button" variant="contained" type="submit">
                  Create
                </Button>
              </form>
              <div id="login-container">
                Already have an account?{" "}
                <Button id="login" onClick={this.click}>
                  Log In
                </Button>
              </div>
              <div>
                <img src="/images/google.png" onClick={this.signinwihgoogle} />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div id="modal" className="modal">
            <div className="modal-content">
              <Button
                variant="contained"
                id="close"
                onClick={() => {
                  document.getElementById("modal").style.display = "none";
                  this.setState({
                    click: false,
                  });
                }}
              >
                X
              </Button>
              <img src={logo} className="logo" id="modal-logo" />
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
                <Button id="submit-button" variant="contained" type="submit">
                  Sign In
                </Button>
              </form>

              <span> </span>
              <span>Forgot?</span>
              <div id="signup-container">
                Don't have an account?{" "}
                <Button id="signup" onClick={this.click}>
                  Sign Up
                </Button>
              </div>
              <div>
                <img src="/images/google.png" onClick={this.signinwihgoogle} />
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
          <div id="login-signup">
            <Button variant="contained" id="login" onClick={this.click}>
              Log In
            </Button>
            <Button variant="contained" id="signup" onClick={this.click}>
              Sign Up
            </Button>
          </div>
        ) : (
          <Button variant="contained" id="sign-out" onClick={this.signout}>
            Sign Out
          </Button>
        )}
        {this.renderModal()}
      </div>
    );
  }
}
export default Auth;
