import React from "react";
import axios from "axios";

// Page Imorts
<<<<<<< HEAD
import Featured from './featured/featured.js';
import Recipe from './shared/recipecard.js';
import searchIcon from './shared/SVGS/SearchIcon.svg';
import Landing from './landing/landing.js'
import title from '../../public/images/title.svg'
import ingredientIcon from './shared/SVGS/IngredientIcon.svg'
import recipeIcon from './shared/SVGS/recipesIcon.svg';
import profileIcon from './shared/SVGS/profileIcon.svg';
import Ingredients from './ingredients/ingredients.js'
import MyProfile from './MyProfile.jsx';


=======
import Featured from "./featured/featured.js";
import Recipe from "./shared/recipecard.js";
import searchIcon from "./shared/SVGS/SearchIcon.svg";
import Landing from "./landing/landing.js";
import ingredientIcon from "./shared/SVGS/IngredientIcon.svg";
import recipeIcon from "./shared/SVGS/recipesIcon.svg";
import profileIcon from "./shared/SVGS/profileIcon.svg";
import Ingredients from "./ingredients/ingredients.js";
import MyProfile from "./MyProfile.jsx";
import Auth from "./auth/login.jsx";
import { app } from "../../firebase_config.js";
import { getAuth, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
>>>>>>> dev

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "login-signup",
      user: sampleUser,
      intolerances: "",
      diet: "",
      userInfo: {},
      uid: "",
      login: false,
      token: "",
      authenticated: false,
    };
    this.viewSwitch = this.viewSwitch.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.setInitialData = this.setInitialData.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  componentDidMount() {
    this.getStatus();
    //need to send verifitcation before getting user info back from the server
    axios
      .get("/getUsersInfo")
      .then((data) => {
        this.setInitialData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setInitialData(obj) {
    this.setState({
      userInfo: obj,
    });
  }

  viewSwitch(e) {
    var value = e.target.id;
    this.setState({ id: value });
  }

  addFavorite(recipeId) {
    let config = {
      method: "put",
      url: "/updateFavorites",
      data: {
        recipeId: recipeId,
        uid: this.state.user.uid,
      },
    };
    axios(config).then((result) => {
      let newFavRecipes = this.state.recipes;
      newFavRecipes.push(recipeId);
      this.setState({
        user: {
          uid: this.state.uid,
          userName: this.state.userName,
          profilePic: this.state.profilePic,
          ingredients: this.state.ingredients,
          notes: this.state.notes,
          diet: this.state.diet,
          intolerances: this.state.intolerances,
          favRecipes: newFavFecipes,
        },
      }).catch((err) => console.log(err));
    });
  }

  handleButtonPress(recipeId) {
    console.log(recipeId);
    let id = recipeId.toString();
    switch (event.target.className) {
<<<<<<< HEAD
      case 'upvote-button':
=======
      case "upvote-button":
        console.log("test upvote");
>>>>>>> dev
        ((recipeId) => {
          let config = {
            method: "put",
            url: "/updateUpvote",
            data: {
<<<<<<< HEAD
              recipeId: id
            }
          }
          axios(config)
=======
              recipeId: recipeId,
            },
          };
          axios(config);
>>>>>>> dev
        })();
        break;
      case "downvote-button":
        ((recipeId) => {
          console.log("test downvote");
          let config = {
            method: "put",
            url: "/updateDownvote",
            data: {
<<<<<<< HEAD
              recipeId: id
            }
          }
          axios(config)
=======
              recipeId: recipeId,
            },
          };
          axios(config);
>>>>>>> dev
        })();
        break;
      default:
        console.log("test default");
    }
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
      <div className="main">
        <div className="navigation">
          <span id="landing" className="logo" onClick={this.viewSwitch} />
          <img id="title" src={title}/>
          <div id="find-recipes" onClick={this.viewSwitch}>
<<<<<<< HEAD
            <img  width='30' src={searchIcon}></img>
             <span>Find Recipes</span>
          </div>
          <div id="my-ingredients" onClick={this.viewSwitch}>
            <img width='30' src={ingredientIcon} />
            <span>My Ingredients</span>
          </div>
          <div id="my-recipes" onClick={this.viewSwitch}>
            <img width='30' src={recipeIcon} />
            <span>My Recipes</span>
          </div>
          <div id="login-signup" onClick={this.viewSwitch}>
            <img width='30' src={profileIcon} />
            <span>Profile</span>
=======
            <img width="30" src={searchIcon}></img>
            Find Recipes
          </div>
          <div id="my-ingredients" onClick={this.viewSwitch}>
            <img width="30" src={ingredientIcon} />
            My Ingredients
          </div>
          <div id="my-recipes" onClick={this.viewSwitch}>
            <img width="30" src={recipeIcon} />
            My Recipes
          </div>
          <div id="login-signup" onClick={this.viewSwitch}>
            <img width="30" src={profileIcon} />
            Profile
>>>>>>> dev
          </div>
          <Auth status={this.getStatus} login={this.state.login} />
        </div>
        <div className="content">
          {this.state.id === "logo" ? (
            <Featured
              handleButtonPress={this.handleButtonPress}
              user={this.state.user}
            />
          ) : (
            ""
          )}
          {this.state.id === "landing" ? (
            <Landing
              handleButtonPress={this.handleButtonPress}
              user={this.state.user}
            />
          ) : (
            ""
          )}
          {this.state.id === "find-recipes" ? (
            <h1>Find Recipes Placeholder</h1>
          ) : (
            ""
          )}
          {this.state.id === "my-ingredients" ? (
            <h1>
              <Ingredients />
            </h1>
          ) : (
            ""
          )}
          {this.state.id === "my-recipes" ? (
            <h1>My Recipes Placeholder</h1>
          ) : (
            ""
          )}
          {this.state.id === "login-signup" ? <MyProfile /> : ""}
        </div>
      </div>
    );
  }
}

export default Main;

var sampleUser = {
  uid: "123",
  userName: "user_name",
  profilePic: "http://pic.com",
  ingredients: "garlic, butter, eggs",
  notes: "I am a note",
  diet: "paleo",
  intolerances: "gluten, dairy",
  favRecipes: [647572, 234, 345],
};
