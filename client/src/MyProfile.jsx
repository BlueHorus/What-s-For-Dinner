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
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
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

  onFileChange(e) {
    console.log(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    this.setState({
      selectedFile: URL.createObjectURL(e.target.files[0]),
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
    const { value, diet, intolerances, changingProfilePic } = this.state;
    return (
      <div className="profile">

        <div>Welcome Back, [USERNAME HERE]!</div>

        <div>
          <img src={this.state.selectedFile} alt="profile-picture" />
          <button onClick={this.changeProfilePic}>x</button>
          {changingProfilePic === true
            ? <input type="file" onChange={this.onFileChange} />
            : null
          }
        </div>

        <div>
          <button onClick={this.handleUsernameChange}>Change Username</button>
          <button onClick={this.handlePasswordChange}>Change Password</button>
        </div>

        <br />

        <div className="diet-list">
          My Current Diet: {diet}
        </div>

        <div className="intolerance-list">
          My Current Intolerances:
          {intolerances.map(food => {
            return (
              <div>
                <div>{food}</div>
                <button value={food} onClick={this.deleteFood}>x</button>
              </div>
            );
          })}
        </div>
        <br />

        <div>Enter any food intolerances below</div>
        <form onSubmit={this.handleSubmit}>
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
          <input type="submit" value="Add" />
        </form>

        <br />

       <div>Select your diet from the dropdown below</div>
        <select value={diet} onChange={this.handleDropdownChange}>
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
        <br />
        <button onClick={this.updateDB}>Confirm Changes!</button>
      </div>
    );
  }
}

export default MyProfile;