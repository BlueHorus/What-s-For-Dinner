import React from 'react';
import axios from 'axios';
import profilePic from './shared/SVGS/profileIcon.svg';


class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      diet: '',
      intolerances: [],
      changingProfilePic: false,
      selectedFile: profilePic,
      url: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.updateDB = this.updateDB.bind(this);
  }

  // componentDidMount() {
  //   axios.get('/getUsersInfo')
  //     .then(info => {
  //       this.setState({
  //         diet:
  //         intolerances:
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  // componentDidUpdate() {

  // }

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
      selectedFile: this.state.url,
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
    console.log(e.target);
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
    const { value, diet, intolerances, changingProfilePic, url } = this.state;
    return (
      <div className="profile">
        <div className="welcome-banner">Welcome Back, [USERNAME HERE]!</div>
        <div className="profile-left">
          {/* <div className="photo-area"> */}
            <img className="profile-pic" src={this.state.selectedFile} alt="profile-picture" />
            <button className="button-change-pic" onClick={this.changeProfilePic}>x</button>
          {/* </div> */}
          {changingProfilePic === true
            ? <form className="url-form" onSubmit={this.uploadPic}>
                <label>
                  Please enter new photo URL:
                  <input type="text" value={url} onChange={this.handleURLChange}/>
                </label>
                <input type="submit" value="Upload" />
              </form>
            : null
          }

          <br />
          <br />

          <button className="button-change-name" onClick={this.handleUsernameChange}>Change Username</button>
          <br />
          <br />
          <button className="button-change-pw" onClick={this.handlePasswordChange}>Change Password</button>
        </div>

        <div className="profile-right">
          <div className="diet">
            My Current Diet: {diet}
          </div>

          <div className="intolerance-list">
            My Current Intolerances:
            {intolerances.map(food => {
              return (
                <div className="intolerance-tile">
                  <span className="intolerance">{food}</span>
                  <button className="button-delete-intolerance" value={food} onClick={this.deleteFood}>x</button>
                </div>
              );
            })}
          </div>

          {/* <div>Enter any food intolerances below</div> */}
          <form className="intolerance-form" onSubmit={this.handleSubmit}>
            <label>
              Enter any food intolerances below
            <br />
            <select value={value} onChange={this.handleChange}>
              <option default> - </option>
              <option value="Dairy">Dairy</option>
              <option value="Egg">Egg</option>
              <option value="Gluten">Gluten</option>
              <option value="Grain">Grain</option>
              <option value="Peanut">Peanut</option>
              <option value="Seafood">Seafood</option>
              <option value="Sesame">Sesame</option>
              <option value="Shellfish">Shellfish</option>
              <option value="Soy">Soy</option>
              <option value="Sulfite">Sulfite</option>
              <option value="Tree Nut">Tree Nut</option>
              <option value="Wheat">Wheat</option>
            </select>
            </label>
            <input type="submit" value="Add" />
          </form>

          <div>Select your diet from the dropdown below</div>
          <select className="diet-form" value={diet} onChange={this.handleDropdownChange}>
            <option default> - </option>
            <option value="gluten free">Gluten-Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="lacto-vegetarian">Lacto-Vegetarian</option>
            <option value="obo-vegetarian">Obo-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescetarian">Pescetarian</option>
            <option value="paleo">Paleo</option>
            <option value="primal">Primal</option>
            <option value="whole30">Whole30</option>
          </select>
          <br />
          <button className="btn-confirm" onClick={this.updateDB}>Confirm Changes!</button>
        </div>
      </div>
    );
  }
}

export default MyProfile;