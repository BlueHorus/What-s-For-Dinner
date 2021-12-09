import React from 'react';
import axios from 'axios';
import Featured from './featured/featured.js';
import Recipe from './shared/recipecard.js';


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
      <h1><Recipe /></h1>
    )
  }
}

export default Main;
