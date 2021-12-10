import React from 'react';
import axios from 'axios';

// Page Imorts
import Featured from './featured/featured.js';
import Recipe from './shared/recipecard.js';
import Landing from './landing/landing.js'


// Icon imports
import searchIcon from './shared/SVGS/searchIcon.svg';
import ingredientIcon from './shared/SVGs/IngredientIcon.svg'
import recipeIcon from './shared/SVGs/recipesIcon.svg';
import profileIcon from './shared/SVGS/profileIcon.svg';



class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "landing",
    };
    this.viewSwitch = this.viewSwitch.bind(this);
  }

  viewSwitch(e) {
    var value = e.target.id;
    this.setState({ id: value });
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
          <div id="my-ingredients">
            <img width='30' src={ingredientIcon} />
            <span  onClick={this.viewSwitch}>
              My Ingredients
            </span>
          </div>
          <div id="my-recipes">
            <img width='30' src={recipeIcon} />
            <span onClick={this.viewSwitch}>
              My Recipes
            </span>
          </div>
          <div id="login-signup">
            <img width='30' src={profileIcon} />
            <span onClick={this.viewSwitch}>
              Profile
            </span>
          </div>
        </div>
        <div className='content'>
        {this.state.id === "logo" ? <Featured /> : ""}
        {this.state.id === "landing" ? <Landing /> : ""}
        {this.state.id === "find-recipes" ? <h1>Find Recipes Placeholder</h1> : ""}
        {this.state.id === "my-ingredients" ? <h1>My Ingredients Placeholder</h1> : ""}
        {this.state.id === "my-recipes" ? <h1>My Recipes Placeholder</h1> : ""}
        {this.state.id === "login-signup" ? <h1>Profile Placeholder</h1> : ""}
      </div>
    </div>
    )
  }
}

export default Main;
