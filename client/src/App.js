import React from "react";
import axios from "axios";
import Auth from "./login.jsx";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Auth />
        <h1>Hello Blue Ocean World!</h1>
      </div>
    );
  }
}

export default Main;
