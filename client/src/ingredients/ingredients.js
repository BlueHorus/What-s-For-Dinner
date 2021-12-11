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
    <div className="user-ingredients">
      <form onSubmit={this.addNote} className="user-notes">
        <label>
          Add note:
          <br/>
          <input type="text" name="name" spellcheck="true" value={this.state.note} onChange={this.setNote}/>
        </label>
        <br />
        <input type="submit" value={String.fromCodePoint(0x22B9)} className="add-button"/>&nbsp;&nbsp;Add
      </form>

      <form onSubmit={this.addIngredient}>
        <label>
          Add ingredient: <br/>
          <input type="text" name="name" spellcheck="true" value={this.state.ingredient} onChange={this.setIngredient}/>
        </label>
        <br />
        <input type="submit" value={String.fromCodePoint(0x22B9)} className="add-button"/>&nbsp;&nbsp;Add
      </form>


      <div className="saved-notes">
         My notes: <br/>
         {this.props.user.notes}
      </div>


      <ul className="ingredients-list"> My ingredient list:
        {this.props.user.ingredients.split(',').map(ing => <li>{ing}</li>)}


      </ul>
    </div>
    )
  }


}


export default Ingredients;