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

    this.setNote = this.setNote.bind(this);
    this.setIngredient = this.setIngredient.bind(this);
  }



  setNote(e) {
    e.preventDefault();
    this.setState({note: e.target.value})
  }


  setIngredient(e) {
    e.preventDefault();
    this.setState({ingredient: e.target.value})
  }


  render() {
    return (
      <div>
      {/* <img src="./images/fridge.svg" id="fridge" /> */}
    <div className="user-ingredients">
      <form onSubmit={this.props.handleNote} className="add-note" name={this.state.note}>
        <label>
          Add note:
          <br/>
          <input type="text" name="name" spellCheck="true" value={this.state.note} onChange={this.setNote}/>
        </label>
        <br />
        <input type="submit" value={String.fromCodePoint(0x22B9)} className="add-note"/>&nbsp;&nbsp;Add
      </form>

      <form onSubmit={this.props.handleIngredient} className="add-ingredient" name={this.state.ingredient}>
        <label>
          Add ingredient: <br/>
          <input type="text"  spellCheck="true" value={this.state.ingredient} onChange={this.setIngredient}/>
        </label>
        <br />
        <input type="submit" value={String.fromCodePoint(0x22B9)} />&nbsp;&nbsp;Add
      </form>


      <div className="saved-notes">
         My notes: <br/>
         {this.props.user.notes} <br/>
         <button className="remove-notes" name="notes" onClick={this.props.handleNote}>{String.fromCodePoint(0x2715)}</button>
      </div>


      <ul className="ingredients-list"> My ingredient list:
        {/* {console.log(this.props.user.ingredients)}; */}
        {this.props.user.ingredients.split(',').map(ing => <li className="one-ingredient">
                                                            {ing}
                                                            <button className="remove-ing-button" name={ing} onClick={this.props.handleIngredient}>{String.fromCodePoint(0x2715)}</button>
                                                            </li>)}


      </ul>
    </div>
      </div>
    )
  }


}


export default Ingredients;