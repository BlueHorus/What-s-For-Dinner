import React from "react";
import { app } from "../../../firebase_config.js";
import axios from "axios";
import logo from "../../../public/images/BlueOceanLogo.svg";
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
    this.signinwihgoogle = this.signinwihgoogle.bind(this);
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

  verifyEmail(email) {
    const auth = getAuth(app);
    const actionCodeSetting = {
      url: "http://localhost:3000",
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, this.state.email, actionCodeSetting)
      .then(() => {
        alert("An verification link was successfully sent to your email!");
        window.localStorage.setItem("email", email);
      })
      .then(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
          let email = window.localStorage.getItem("email");
          if (!email) {
            email = window.prompt("Please provide your email for confirmation");
          }
          signInWithEmailLink(auth, email, window.location.href).then(
            (result) => {
              window.localStorage.removeItem("email");
            }
          );
        }
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
      this.verifyEmail(this.state.email);
      // , (response) => {
      // if (response === true) {
      //   createUserWithEmailAndPassword(
      //     auth,
      //     this.state.email,
      //     this.state.password
      //   ).then((info) => {
      //     this.setState({ uid: info.user.uid });
      //     console.log(this.state.uid);

      //     // axios.post("/createUser", {
      //     //   uid: this.state.uid,
      //     //   username: this.state.username,
      //     //   url: this.state.url,
      //     // });
      //     alert("Thanks you! ");
      //     e.target.reset();
      //     this.setState({ click: false });
      //   });
      // }
    }
    // ).catch((err) => {
    //   alert("Please try again!" + err);
    //   console.log(err.message);
    // });
    // }
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
              <button
                id="close"
                onClick={() => {
                  document.getElementById("modal").style.display = "none";
                  this.setState({
                    click: false,
                  });
                }}
              >
                X
              </button>
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
                <button type="submit">Create</button>
              </form>
              <div id="login-container">
                Already have an account?{" "}
                <u className="login" onClick={this.click}>
                  Log In
                </u>
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
              <button
                id="close"
                onClick={() => {
                  document.getElementById("modal").style.display = "none";
                  this.setState({
                    click: false,
                  });
                }}
              >
                X
              </button>
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
                <button type="submit">Sign In</button>
              </form>

              <span> </span>
              <span>Forgot?</span>
              <div id="signup-container">
                Don't have an account?{" "}
                <u className="signup" onClick={this.click}>
                  Sign Up
                </u>
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
            <button className="login" onClick={this.click}>
              Log In
            </button>
            <button className="signup" onClick={this.click}>
              Sign Up
            </button>
          </div>
        ) : (
          <button id="sign-out" onClick={this.signout}>
            Sign Out
          </button>
        )}
        {this.renderModal()}
      </div>
    );
  }
}
export default Auth;
