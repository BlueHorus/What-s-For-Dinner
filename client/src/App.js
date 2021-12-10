import React from 'react';
import axios from 'axios';
import Featured from './featured/featured.js';
import Recipe from './shared/recipecard.js';
import searchIcon from './shared/SVGS/searchIcon.svg';
import logo from './shared/SVGS/BlueOceanLogo.svg';


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
      <div>
        <div className="navigation">
          <span id="logo" onClick={this.viewSwitch}>
            {/* <img src={logo} height='60'></img> */}
          </span>
          <div id="find-recipes" onClick={this.viewSwitch}>
            <img  width='35' src={searchIcon}></img>
              Find Recipes
          </div>
          <div id="my-ingredients">
            🍜
            <span  onClick={this.viewSwitch}>
              My Ingredients
            </span>
          </div>
          <div id="my-recipes">
            🍜
            <span onClick={this.viewSwitch}>
              My Recipes
            </span>
          </div>
          <div id="login-signup">
            🍜
            <span onClick={this.viewSwitch}>
              Log In/ Sign Up
            </span>
          </div>
        </div>
        <div className='Main'>
        {this.state.id === "logo" ? <div><Featured /></div> : ""}
        {this.state.id === "find-recipes" ? <h1>Find Recipes Placeholder</h1> : ""}
        {this.state.id === "my-ingredients" ? <h1>My Ingredients Placeholder</h1> : ""}
        {this.state.id === "my-recipes" ? <h1>My Recipes Placeholder</h1> : ""}
        {this.state.id === "login-signup" ? <h1>Profile Placeholder</h1> : ""}
      </div>
      <div>placeholder</div>
    </div>
    )
  }
}

export default Main;
