import React from 'react';
import axios from 'axios';
import defaultPic from './shared/SVGS/profileIcon.svg';


class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
      value: '',
      diet: '',
      intolerances: [],
      changingProfilePic: false,
      selectedFile: defaultPic,
      url: '',
    };

    this.setUserInfo = this.setUserInfo.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleDietSubmit = this.handleDietSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.updateDB = this.updateDB.bind(this);
  }

  componentDidMount() {
    this.setUserInfo(this.props.userInfo);
  }

  setUserInfo(info) {
    const { userInfo } = this.props;
    this.setState({
      userInfo: info,
      // selectedFile: userInfo.profilePic ? userInfo.profilePic : defaultPic,
      diet: userInfo.diet,
      intolerances: userInfo.intolerances.split(', '),
    })
  }

  handleUsernameChange() {
  }

  handlePasswordChange() {
  }

  changeProfilePic() {
    this.setState({
      changingProfilePic: true,
    });
  }

  handleURLChange(e) {
    this.setState({
      url: e.target.value,
    })
  }

  uploadPic(e) {
    this.setState({
      selectedFile: this.state.url ? this.state.url : defaultPic,
      changingProfilePic: false,
    })
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    })
  }

  handleSubmit(e) {
    const { intolerances, value } = this.state;
    event.preventDefault();
    this.setState({
      intolerances: [...intolerances, value],
      value: '',
    })
  }

  // handleDietSubmit(e) {
  //   const { diet } = this.state;
  //   event.preventDefault();
  //   this.setState({
  //     diet: e.target.value,
  //   })
  // }

  handleDropdownChange(e) {
    this.setState({
      diet: e.target.value,
    })
  }

  updateIntolerances(e) {
    const { intolerances } = this.state;
    this.setState({
      intolerances: [...intolerances, e.target.value],
    })
  }

  deleteFood(e) {
    const { intolerances } = this.state;
    this.setState({
      intolerances: intolerances.filter(food => {
        return food !== e.target.value;
      })
    })
  }

  updateDB() {
    const { intolerances, diet } = this.state;
    if (intolerances) {
      axios.patch('/updateIntolerances')
    }
    if (diet) {
      axios.patch('/updateDiet')
    }
  }

  render() {
    const { value, diet, intolerances, changingProfilePic, url, userInfo } = this.state;
    return (
      <div className="profile">
        <div className="welcome-banner">Welcome Back, {userInfo.userName}!</div>
        <div className="profile-left">
          <div className="profile-pic-block">
            <img className="profile-pic" src={this.state.selectedFile} alt="profile-picture" />
            <button className="button-change-pic" onClick={this.changeProfilePic}>x</button>
          </div>
          {changingProfilePic === true
            ? <form className="url-form" onSubmit={this.uploadPic}>
                <label>
                  Please enter new photo URL
                  <br />
                  <input type="text" value={url} onChange={this.handleURLChange}/>
                </label>
                <input type="submit" value="Upload" />
              </form>
            : null
          }

          <button className="button-change-name" onClick={this.handleUsernameChange}>Change Username</button>
          <br />
          <button className="button-change-pw" onClick={this.handlePasswordChange}>Change Password</button>
        </div>

        <div className="profile-right">
          <div className="diet">
            My Current Diet: <b>{diet}</b>
          </div>

          <form className="diet-form">
            <label>
              Change your diet in the dropdown below!
            <br />
          <select value={diet} onChange={this.handleDropdownChange}>
            <option default> - </option>
            <option value="gluten free">gluten-Free</option>
            <option value="ketogenic">ketogenic</option>
            <option value="vegetarian">vegetarian</option>
            <option value="lacto-vegetarian">lacto-vegetarian</option>
            <option value="obo-vegetarian">obo-vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="pescetarian">pescetarian</option>
            <option value="paleo">paleo</option>
            <option value="primal">primal</option>
            <option value="whole30">whole30</option>
          </select>
          </label>
            <input type="submit" value="Confirm" />
          </form>

          <div className="intolerance-list">
            My Current Intolerances:
            {intolerances.map(food => {
              return (
                <div className="intolerance-tile">
                  <span className="intolerance"><b>{food}</b></span>
                  <button className="button-delete-intolerance" value={food} onClick={this.deleteFood}>x</button>
                </div>
              );
            })}
          </div>

          <form className="intolerance-form" onSubmit={this.handleSubmit}>
            <label>
              Enter any food intolerances below
            <br />
            <select value={value} onChange={this.handleChange}>
              <option default> - </option>
              <option value="dairy">Dairy</option>
              <option value="egg">Egg</option>
              <option value="gluten">Gluten</option>
              <option value="grain">Grain</option>
              <option value="peanut">Peanut</option>
              <option value="seafood">Seafood</option>
              <option value="sesame">Sesame</option>
              <option value="shellfish">Shellfish</option>
              <option value="soy">Soy</option>
              <option value="sulfite">Sulfite</option>
              <option value="tree Nut">Tree Nut</option>
              <option value="wheat">Wheat</option>
            </select>
            </label>
            <input type="submit" value="Add" />
          </form>

          <br />
          <button className="btn-confirm" onClick={this.updateDB}>Confirm Changes!</button>
        </div>
      </div>
    );
  }
}

export default MyProfile;