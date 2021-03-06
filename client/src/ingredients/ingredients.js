import React from "react";
import axios from "axios";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      ingredient: "",
      myIngredients: [],
    };

    this.setNote = this.setNote.bind(this);
    this.setIngredient = this.setIngredient.bind(this);
  }

  setNote(e) {
    e.preventDefault();
    this.setState({ note: e.target.value });
  }

  setIngredient(e) {
    e.preventDefault();
    this.setState({ ingredient: e.target.value });
  }

  render() {
    const ingredientsList = !this.props.user.ingredients
      ? ""
      : this.props.user.ingredients;
    const removeBtn =
      this.props.user.ingredients === ""
        ? "Add ingredient above"
        : ingredientsList.split(",").map((ing) => (
            <div className="one-ingredient">
              <li>{ing.trim()}</li>
              <button
                className="remove-ing-button"
                name={ing}
                onClick={this.props.handleIngredient}
              >
                {String.fromCodePoint(0x2715)}
              </button>
            </div>
          ));
    return (
      <div id="fridge">
        <div className="user-ingredients">
          <Card>
            <CardContent>
              <form
                onSubmit={this.props.handleIngredient}
                className="add-ingredient"
                name={this.state.ingredient}
              >
                <label>
                  Add ingredient: <br />
                  <input
                    type="text"
                    spellCheck="true"
                    value={this.state.ingredient}
                    onChange={this.setIngredient}
                  />
                  <input
                    type="submit"
                    value={String.fromCodePoint(0x22b9)}
                    className="add-ing-button"
                  />
                </label>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <form
                onSubmit={this.props.handleNote}
                className="add-note"
                name={this.state.note}
              >
                <label>
                  Add note: <br />
                  <input
                    type="text"
                    name="name"
                    spellCheck="true"
                    value={this.state.note}
                    onChange={this.setNote}
                  />
                  <input
                    type="submit"
                    value={String.fromCodePoint(0x22b9)}
                    className="add-note-button"
                  />
                </label>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <ul className="ingredients-list">
                {" "}
                My ingredient list: <br />
                {removeBtn}
              </ul>
            </CardContent>
          </Card>

          <div className="saved-notes">
            My notes: <br />
            {this.props.user.notes} <br />
            <button
              className="remove-notes"
              name="notes"
              onClick={this.props.handleNote}
            >
              {String.fromCodePoint(0x2715)}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Ingredients;
