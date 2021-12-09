import React from "react";
import axios from "axios";

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
    return (
      <div>
        <div className="navigation">
          <span id="1" onClick={this.viewSwitch}>
            LOGO
          </span>
          <div>
            🍜
            <span id="2" onClick={this.viewSwitch}>
              Find Recipes
            </span>
          </div>
          <div>
            🍜
            <span id="3" onClick={this.viewSwitch}>
              My Ingredients
            </span>
          </div>
          <div>
            🍜
            <span id="4" onClick={this.viewSwitch}>
              My Recipes
            </span>
          </div>
          <div>
            🍜
            <span id="5" onClick={this.viewSwitch}>
              Log In/ Sign Up
            </span>
          </div>
        </div>
        {this.state.id === "1" ? <h1>Hello Blue Ocean World!</h1> : ""}
        {this.state.id === "2" ? <h1>Find Recipes Placeholder</h1> : ""}
        {this.state.id === "3" ? <h1>My Ingredients Placeholder</h1> : ""}
        {this.state.id === "4" ? <h1>My Recipes Placeholder</h1> : ""}
        {this.state.id === "5" ? <h1>Profile Placeholder</h1> : ""}
      </div>
    );
  }
}

export default Main;
