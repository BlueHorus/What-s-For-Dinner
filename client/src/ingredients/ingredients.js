import React from 'react';
import axios from 'axios';
// import MyIngredients from './myIngredients.js'


// add ingredient	"1. As a user, i want to upload ingredients
// 2. As a user, i want the app to check if my input ingredient is valid
// 3. As a user, i want to take notes for my ingredient "
// delete ingredient	"1. As a user, i want to delete ingredients
// 2. As a user, i want to take notes for my ingredient "


// app.patch("/updateIngredients", (req, res) => {
//   // request should contain ingredients
//   // query database to update ingredients
//   // send "successfully updated ingredients"
//   res.send("updateIngredients");
// });

//receives ingredients as props?

class Ingredients extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      note: '',
      ingredient: '',
      myIngredients: []
    };

    this.addNote = this.addNote.bind(this);
    this.setNote = this.setNote.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.setIngredient = this.setIngredient.bind(this);
  }


  getIngredients() {

  }

  addNote(e) {
    e.preventDefault();
    console.log('clicked, ', this.state.note)
  }

  setNote(e) {
    e.preventDefault();
    this.setState({note: e.target.value})
  }

  addIngredient(e) {
    e.preventDefault();
    console.log('clicked, ', this.state.ingredient);
    axios.get("/updateIngredients", this.state.ingredient)
      .then(console.log('ing added'))
  }

  setIngredient(e) {
    e.preventDefault();
    this.setState({ingredient: e.target.value})
  }

  render() {
    return (
    <div>
      <form onSubmit={this.addNote}>
        <label>
          Notes:
          <br/>
          <input type="text" name="name" spellcheck="true" value={this.state.note} onChange={this.setNote}/>
        </label>
        <br/>
        <input type="submit" value={String.fromCodePoint(0x22B9)} className="add-button"/>&nbsp;&nbsp;Add note
      </form>
      <br/>
      <br/>
      <br/>
      <ul> My ingredient list
        <li>sugar</li>
        <li>salt</li>
        <li>pepper</li>
        <li>endangered animal meat</li>
        <li>
          <form onSubmit={this.addIngredient}>
            <label>
              <input type="text" name="name" spellcheck="true" value={this.state.ingredient} onChange={this.setIngredient}/>
            </label>
            <input type="submit" value={String.fromCodePoint(0x22B9)} className="add-button"/>&nbsp;&nbsp;Add ingredient
          </form>
        </li>
      </ul>
    </div>
    )
  }


}


export default Ingredients;