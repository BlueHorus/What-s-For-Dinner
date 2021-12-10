import React from 'react';
import axios from 'axios';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      diet: '',
      changingProfilePic: false,
      selectedFile: null,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleUsernameChange() {
    //MAKE A MODAL? SEND INFO TO DB, FIREBASE??
  }

  handlePasswordChange() {
    //MAKE A MODAL? SEND INFO TO DB, FIREBASE??
  }

  changeProfilePic() {
    this.setState({
      changingProfilePic: true,
    });
  }

  onFileChange(e) {
    this.setState({
      selectedFile: e.target.files[0],
      changingProfilePic: false,
    })
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    })
  }

  handleSubmit(e) {
    event.preventDefault();
    axios.post('/SERVER_ROUTE_HERE', {
      diet: e.target.value,
    })
  }

  handleDropdownChange(e) {
    this.setState({
      diet: e.target.value,
    })
  }


  render() {
    const { value, diet, changingProfilePic } = this.state;
    return (
      <div className="profile">

        <div>Welcome Back, [USERNAME HERE]!</div>

        <div>
          <img src='' alt="profile-picture" />
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

        <div>Enter any food intolerances below</div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={this.handleChange}
            placeholder="e.g. 'dairy, nuts'"
          />
          <input type="submit" value="Add" />
        </form>

        <br />

       <div>Select your diet in the dropdown below</div>
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
      </div>
    );
  }
}

export default MyProfile;