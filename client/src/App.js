import React from 'react';
import axios from 'axios';
import Featured from './featured/featured.js';
import Recipe from './shared/recipecard.js';
import searchIcon from './shared/SVGS/SearchIcon.svg';
import ingredientIcon from './shared/SVGS/IngredientIcon.svg'
import recipeIcon from './shared/SVGS/recipesIcon.svg';
import profileIcon from './shared/SVGS/profileIcon.svg';
import Ingredients from './ingredients/ingredients.js'



class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "1",
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
          <span id="logo" onClick={this.viewSwitch} />
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
        {this.state.id === "logo" ? <div><Featured /></div> : ""}
        {this.state.id === "find-recipes" ? <h1>Find Recipes Placeholder</h1> : ""}
        {this.state.id === "my-ingredients" ? <h1><Ingredients /></h1> : ""}
        {this.state.id === "my-recipes" ? <h1>My Recipes Placeholder</h1> : ""}
        {this.state.id === "login-signup" ? <h1>Profile Placeholder</h1> : ""}
      </div>
    </div>
    )
  }
}

export default Main;
