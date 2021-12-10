import React from 'react';
import axios from 'axios';
//DELETE BEFORE PUSHING!!
import MyProfile from './MyProfile.jsx';


class Main extends React.Component {


  render() {
    return(
      <>
        <h1>Hello Blue Ocean World!</h1>
        <MyProfile />
      </>
    )
  }
}


export default Main