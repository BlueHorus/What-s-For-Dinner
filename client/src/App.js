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
import title from '../../public/images/title.svg'
import { app } from "../../firebase_config.js";
import { getAuth, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import Reminder from "./auth/reminder.jsx";
import Button from '@mui/material/Button';
import FaceIcon from '@mui/icons-material/Face';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "landing",
      user: sampleUser,
      uid: "",
      login: false,
      token: "",
      authenticated: false,
    };
    this.viewSwitch = this.viewSwitch.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.setInitialData = this.setInitialData.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.handleIngredient = this.handleIngredient.bind(this);
    this.getUser = this.getUser.bind(this);
    this.handleNote = this.handleNote.bind(this);
  }

  componentDidMount() {
    //need to send verifitcation before getting user info back from the server
    this.getStatus(() => {
      this.getAuthentication(() => {
        if (this.state.authenticated === true) {
          axios
            .get("/getUserInfo")
            .then((data) => {
              this.setInitialData(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });

    // axios
    //   .get("/getUsersInfo")
    //   .then((data) => {
    //     this.setInitialData(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  getUser() {
    axios('/getUserInfo', {
      params: {
        'uid': this.state.user.uid
      }
    })
      .then((data) => {
        this.setInitialData(data.data);
      })
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
    let id = recipeId.toString();
    switch (event.target.className) {
      case 'upvote-button':
        console.log('test upvote');
        (() => {
          let config = {
            method: "put",
            url: "/updateUpvote",
            data: {
              recipeId: id
            }
          }
          axios(config)
        })();
        break;
      case 'downvote-button':
        (() => {
          console.log('test downvote')
          let config = {
            method: "put",
            url: "/updateDownvote",
            data: {
              recipeId: id
            }
          }
          axios(config)
        })();
        break;
      case 'update-diet':
        (() => {
          console.log('test updating diet: ', recipeId);
          let config = {
            method: 'put',
            url: '/updateDiet',
            data: recipeId,
          }
          axios(config)
        })();
        break;
      case 'update-intolerances':
        (() => {
          console.log('test updating intolerances: ', recipeId);
          let config = {
            method: 'put',
            url: '/updateIntolerances',
            data: recipeId,
          }
          axios(config)
        })();
        break;
      case 'url-form':
        (() => {
          console.log('test updating profile pic: ', recipeId);
          let config = {
            method: 'put',
            url: '/updateProfilePic',
            data: recipeId,
          }
          axios(config)
        })();
        break;
        default: console.log('test default');
    }
  }

  //show whether user is login in or not
  getStatus(func) {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
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
        // console.log("Not sign in");
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


  handleIngredient(event) {
    event.preventDefault();
    const ingredient = event.target.name;
    let config = {
      method: 'put',
      url: '/updateIngredients',
      data: {
        uid: this.state.user.uid,
        ingredients: this.state.user.ingredients
      }
    };
    switch (event.target.className) {
      case 'add-ingredient':
        config.data.ingredients = this.state.user.ingredients.concat(',', ingredient);
        axios(config)
          .then( () => {this.getUser()})
          .catch(err => console.log(err))
      break;

      case 'remove-ing-button':
        config.data.ingredients = this.state.user.ingredients.replace(ingredient, '');
        config.data.ingredients = config.data.ingredients.replace(/,{2,}/, ',')
        config.data.ingredients = config.data.ingredients.replace(/^,/, '')
        config.data.ingredients = config.data.ingredients.replace(/,$/, '')
        console.log('newlist: ', config.data.ingredients)
        axios(config)
          .then( () => {this.getUser()})
          .catch(err => console.log(err))
    }
  }

  handleNote(event) {
    event.preventDefault();
    const note = event.target.name;
    let config = {
      method: 'put',
      url: '/updateNote',
      data: {
        uid: this.state.user.uid,
        note: this.state.user.notes
      }
    };
    switch (event.target.className) {
      case 'add-note':
        config.data.note = this.state.user.notes.concat(', ', note.value);
        axios(config)
          .then( () => {this.getUser()})
          .catch(err => console.log(err))
      break;

      case 'remove-notes':
        //remove from list
        config.data.note = '';
        axios(config)
          .then( () => {this.getUser()})
          .catch(err => console.log(err));
        break;
    }
  }



  // call this function to validate user request before going to "my recipt/ my incredient"
  //need to comeback to test this function with funcitonal api end points
  getAuthentication(func) {
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
        })
        .then(func)
        .catch((err) => console.log(err.message));
    }
  }



  render() {
    return (
      <div className="main">
        <div className="navigation">
          <span id="landing" className="logo" onClick={this.viewSwitch} />
          <img id="title" src={title}/>
          <Button id="find-recipes" startIcon={<SearchIcon />}variant='contained' onClick={this.viewSwitch}>
            Find Recipes
          </Button>
          {this.state.login ? <Button variant='contained' id="my-ingredients" startIcon={<LocalDiningIcon />} onClick={this.viewSwitch}>
            My Ingredients
          </Button> :
          <Button id="my-ingredients" startIcon={<LocalDiningIcon />} variant='contained' disabled>
            My Ingredients
          </Button>}
          {this.state.login ? <Button startIcon={<LunchDiningIcon />}  variant='contained' id="my-recipes" onClick={this.viewSwitch}>
            My Recipes
          </Button> :
          <Button startIcon={<LunchDiningIcon />} variant='contained' id="my-recipes" disabled>
            My Recipes
          </Button>}
          {this.state.login ? <Button id="profile" onClick={this.viewSwitch} startIcon={<FaceIcon />} >
            Profile
          </Button> :
          <Button startIcon={<FaceIcon />} variant='contained' id="profile" disabled>
            Profile
          </Button>}
          <Auth status={this.getStatus} login={this.state.login} />
        </div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth='sm'>
            <Box sx={{ bgcolor: 'white', height: '100vh', width: '100%'}}>
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
               <Ingredients user={this.state.user}
               handleIngredient={this.handleIngredient}
               handleNote={this.handleNote}/>
          ) : (
            ""
          )}
          {this.state.id === "my-recipes" ? (
            <h1>My Recipes Placeholder</h1>
          ) : (
            ""
          )}
          {this.state.id === "login-signup" ?
            <MyProfile
              userInfo={this.state.user}
              handleButtonPress={this.handleButtonPress}
              getStatus={this.getStatus}
            />
            : ""
          }
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
   notes: "I am a note.  I am a crazy long set of notes actually.  I mean I'm not sure how much there is to say about all this food, but I can't think of a quicker way to  test out this sweet sticky note.  Have you ever tried brownies?  Just the box stuff.  Nothing fancy.  Hey computer, go build me some brownies.",
   diet: "paleo",
   intolerances: "gluten, dairy",
   favRecipes: [123,234,345]
}


