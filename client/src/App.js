import React from "react";
import axios from "axios";

// Page Imorts
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
import title from "../../public/images/title.svg";
import { app } from "../../firebase_config.js";
import { getAuth, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import Reminder from "./auth/reminder.jsx";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FindRecipes from "./findRecipes/findRecipes.js";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "landing",
      user: null,
      login: false,
      token: "",
      authenticated: false,
    };
    this.viewSwitch = this.viewSwitch.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.setInitialData = this.setInitialData.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.handleIngredient = this.handleIngredient.bind(this);
    // this.getUser = this.getUser.bind(this);
    this.handleNote = this.handleNote.bind(this);
  }

  componentDidMount() {
    //need to send verifitcation before getting user info back from the server
    this.getStatus(() => {
      if (this.state.token != "") {
        axios
          .get("/getUserInfo", {
            headers: {
              Authorization: this.state.token,
            },
          })
          .then((data) => {
            this.setInitialData(data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  getUser() {
    axios("/getUserInfo", {
      headers: { Authorization: this.state.token },
    }).then((data) => {
      this.setInitialData(data.data);
    });
  }

  setInitialData(obj) {
    this.setState({
      user: obj,
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
      },
      headers: {
        Authorization: this.state.token,
      },
    };
  }

  handleButtonPress(recipeId) {
    let Id = recipeId.toString();
    switch (event.target.id) {
      case "upvote-button":
        (() => {
          let config = {
            method: "put",
            url: "/updateUpvote",
            data: {
              recipeId: Id,
            },
            headers: {
              Authorization: this.state.token,
            },
          };
          axios(config);
        })();
        break;

        break;
      case "downvote-button":
        (() => {
          let config = {
            method: "put",
            url: "/updateDownvote",
            data: {
              recipeId: Id,
            },
            headers: {
              Authorization: this.state.token,
            },
          };
          axios(config);
        })();
        break;
      case "update-intolerances":
        (() => {
          let config = {
            headers: {
              Authorization: this.state.token,
            },
            method: "put",
            url: "/updateIntolerances",
            data: recipeId,
          };
          axios(config);
        })();
        break;
      case "url-form":
        (() => {
          let config = {
            headers: {
              Authorization: this.state.token,
            },
            method: "put",
            url: "/updateProfilePic",
            data: recipeId,
          };
          axios(config);
        })();
        break;
      case "username-form":
        (() => {
          let config = {
            headers: {
              Authorization: this.state.token,
            },
            method: "put",
            url: "/updateUsername",
            data: recipeId,
          };
          axios(config);
        })();
        break;
      case "favorite-button":
        (() => {
          let config = {
            method: "post",
            url: "/addToFavorites",
            data: {
              recipeId: recipeId,
            },
            headers: {
              Authorization: this.state.token,
            },
          };
          axios(config)
            .then((result) => {
              this.getUser();
            })
            .catch((err) => console.log(err));
        })();
        break;
      case "unfavorite-button":
        let config = {
          method: "delete",
          url: "/removeFromFavorites",
          data: {
            recipeId: recipeId,
          },
          headers: {
            Authorization: this.state.token,
          },
        };
        axios(config).then((results) => {
          this.getUser();
        });
      default:
        null;
    }
  }

  //show whether user is login in or not
  getStatus(func) {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
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

  handleIngredient(event) {
    event.preventDefault();
    const ingredient = event.target.name;
    let config = {
      method: "put",
      url: "/updateIngredients",
      headers: { Authorization: this.state.token },
      data: {
        ingredients: this.state.user.ingredients,
      },
    };

    switch (event.target.className) {
      case "add-ingredient":
        if (!this.state.user.ingredients) {
          config.data.ingredients = ingredient;
        } else {
          config.data.ingredients = this.state.user.ingredients.concat(
            ",",
            ingredient
          );
        }
        axios(config)
          .then(() => {
            this.getUser();
          })
          .catch((err) => console.log(err));
        break;

      case "remove-ing-button":
        config.data.ingredients = this.state.user.ingredients.replace(
          ingredient,
          ""
        );
        config.data.ingredients = config.data.ingredients.replace(/,{2,}/, ",");
        config.data.ingredients = config.data.ingredients.replace(/^,/, "");
        config.data.ingredients = config.data.ingredients.replace(/,$/, "");
        axios(config)
          .then(() => {
            this.getUser();
          })
          .catch((err) => console.log(err));
    }
  }

  handleNote(event) {
    event.preventDefault();
    const note = event.target.name;
    let config = {
      method: "put",
      url: "/updateNote",
      headers: { Authorization: this.state.token },
      data: {
        note: this.state.user.notes,
      },
    };

    switch (event.target.className) {
      case "add-note":
        if (!this.state.user.notes) {
          config.data.note = note.value;
        } else {
          config.data.note = this.state.user.notes.concat(
            "\n",
            note.value,
            "\n"
          );
        }
        axios(config)
          .then(() => {
            this.getUser();
          })
          .catch((err) => console.log(err));
        break;

      case "remove-notes":
        //remove from list
        config.data.note = "";
        axios(config)
          .then(() => {
            this.getUser();
          })
          .catch((err) => console.log(err));
        break;
    }
  }

  render() {
    return (
      <div className="main">
        <div className="navigation">
          <span id="landing" className="logo" onClick={this.viewSwitch} />
          <img id="title" src={title} />
          <Button
            id="find-recipes"
            startIcon={<SearchIcon />}
            variant="contained"
            onClick={this.viewSwitch}
          >
            Find Recipes
          </Button>
          {this.state.login ? (
            <Button
              variant="contained"
              id="my-ingredients"
              startIcon={<LocalDiningIcon />}
              onClick={this.viewSwitch}
            >
              My Ingredients
            </Button>
          ) : (
            <Button
              variant="contained"
              id="my-ingredients"
              startIcon={<LocalDiningIcon />}
              onClick={() =>
                alert("Please sign up or log in to use this feature")
              }
            >
              My Ingredients
            </Button>
          )}
          {this.state.login ? (
            <Button
              startIcon={<LunchDiningIcon />}
              variant="contained"
              id="my-recipes"
              onClick={this.viewSwitch}
            >
              My Recipes
            </Button>
          ) : (
            <Button
              startIcon={<LunchDiningIcon />}
              variant="contained"
              id="my-recipes"
              onClick={() =>
                alert("Please sign up or log in to use this feature")
              }
            >
              My Recipes
            </Button>
          )}

          {this.state.login ? (
            <Button
              id="profile"
              onClick={this.viewSwitch}
              startIcon={<FaceIcon />}
            >
              Profile
            </Button>
          ) : (
            <Button
              id="profile"
              onClick={() =>
                alert("Please sign up or log in to use this feature")
              }
              startIcon={<FaceIcon />}
            >
              Profile
            </Button>
          )}
          <Auth status={this.getStatus} login={this.state.login} />
        </div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Box
              sx={{
                bgcolor: "white",
                minHeight: "100vh",
                height: "100%",
                width: "100%",
                marginTop: "10px",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                <FindRecipes
                  user={this.state.user}
                  handleButtonPress={this.handleButtonPress}
                />
              ) : (
                ""
              )}
              {this.state.id === "my-ingredients" ? (
                <Ingredients
                  user={this.state.user}
                  handleIngredient={this.handleIngredient}
                  handleNote={this.handleNote}
                />
              ) : (
                ""
              )}
              {this.state.id === "my-recipes" ? (
                <h1>My Recipes Placeholder</h1>
              ) : (
                ""
              )}
              {this.state.id === "profile" ? (
                <MyProfile
                  userInfo={this.state.user}
                  handleButtonPress={this.handleButtonPress}
                  getStatus={this.getStatus}
                />
              ) : (
                ""
              )}
            </Box>
          </Container>
        </React.Fragment>
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
  notes:
    "I am a note.  I am a crazy long set of notes actually.  I mean I'm not sure how much there is to say about all this food, but I can't think of a quicker way to  test out this sweet sticky note.  Have you ever tried brownies?  Just the box stuff.  Nothing fancy.  Hey computer, go build me some brownies.",
  diet: "paleo",
  intolerances: "gluten, dairy",
  favRecipes: [123, 234, 345],
};
