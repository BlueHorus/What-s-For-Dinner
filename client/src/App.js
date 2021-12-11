import React from 'react';
import axios from 'axios';

// Page Imorts
import Featured from './featured/featured.js';
import Recipe from './shared/recipecard.js';
import searchIcon from './shared/SVGS/SearchIcon.svg';
import Landing from './landing/landing.js'
import ingredientIcon from './shared/SVGS/IngredientIcon.svg'
import recipeIcon from './shared/SVGS/recipesIcon.svg';
import profileIcon from './shared/SVGS/profileIcon.svg';
<<<<<<< HEAD
import Ingredients from './ingredients/ingredients.js';
import Landing from './landing/landing.js';

=======
import Ingredients from './ingredients/ingredients.js'
import MyProfile from './MyProfile.jsx';
>>>>>>> dev



class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "login-signup",
      user: sampleUser,
      intolerances: '',
      diet: '',
      userInfo: {},
    };
    this.viewSwitch = this.viewSwitch.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.setInitialData = this.setInitialData.bind(this);
  }

  componentDidMount() {
    axios.get('/getUsersInfo')
      .then(data => {
        this.setInitialData(data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  setInitialData(obj) {
    this.setState({
      userInfo: obj,
    })
  }

  viewSwitch(e) {
    var value = e.target.id;
    this.setState({ id: value });
  }

  addFavorite(recipeId) {
    let config = {
      method: 'put',
      url: '/updateFavorites',
      data: {
        recipeId: recipeId,
        uid: this.state.user.uid
      }
    }
    axios(config)
    .then((result) => {
      let newFavRecipes = this.state.recipes
      newFavRecipes.push(recipeId)
      this.setState({
        user: {
        uid: this.state.uid,
        userName: this.state.userName,
        profilePic: this.state.profilePic,
        ingredients: this.state.ingredients,
        notes: this.state.notes,
        diet: this.state.diet,
        intolerances: this.state.intolerances,
        favRecipes: newFavFecipes

        }
      })
      .catch((err) => console.log(err))
    })
  }

  handleButtonPress(recipeId) {
    switch (event.target.className) {
      case 'upvote-button':
        console.log('test upvote');
        ((recipeId) => {
          let config = {
            method: 'put',
            url: '/updateUpvote',
            data: {
              recipeId: recipeId
            }
          }
          axios(config)
        })();
        break;
      case 'downvote-button':
        ((recipeId) => {
          console.log('test downvote')
          let config = {
            method: 'put',
            url: '/updateDownvote',
            data: {
              recipeId:recipeId
            }
          }
          axios(config)
        })();
        break;
        default: console.log('test default');
    }

  }





  render() {
    return(
      <div className='main'>
        <div className="navigation">
          <span id="landing" className="logo" onClick={this.viewSwitch} />
          <span id="title">What's For Dinner?</span>
          <div id="find-recipes" onClick={this.viewSwitch}>
            <img  width='30' src={searchIcon}></img>
              Find Recipes
          </div>
          <div id="my-ingredients" onClick={this.viewSwitch}>
            <img width='30' src={ingredientIcon} />
              My Ingredients
          </div>
          <div id="my-recipes" onClick={this.viewSwitch}>
            <img width='30' src={recipeIcon} />
              My Recipes
          </div>
          <div id="login-signup" onClick={this.viewSwitch}>
            <img width='30' src={profileIcon} />
              Profile
          </div>
        </div>
        <div className='content'>
        {this.state.id === "logo" ? <Featured handleButtonPress={this.handleButtonPress} user={this.state.user}/> : ""}
        {this.state.id === "landing" ? <Landing handleButtonPress={this.handleButtonPress} user={this.state.user}/> : ""}
        {this.state.id === "find-recipes" ? <h1>Find Recipes Placeholder</h1> : ""}
        {this.state.id === "my-ingredients" ? <Ingredients user={this.state.user}/> : ""}
        {this.state.id === "my-recipes" ? <h1>My Recipes Placeholder</h1> : ""}
        {this.state.id === "login-signup" ? <MyProfile /> : ""}
      </div>
    </div>
    )
  }
}

export default Main;

var sampleUser = {
  uid: "123",
   userName: "user_name",
   profilePic: "http://pic.com",
   ingredients: "garlic, butter, eggs",
   notes: "I am a note.  I am a crazy long set of notes actually.  I mean I'm not sure how much there is to say about all this food, but I can't think of a quicker way to  test out this sweet sticky note.  Have you ever tried brownies?  Just the box stuff.  Nothing fancy.  Hey app, go get me brownies.",
   diet: "paleo",
   intolerances: "gluten, dairy",
   favRecipes: [123,234,345]
}

