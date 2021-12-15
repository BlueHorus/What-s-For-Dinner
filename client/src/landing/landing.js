import React from "react";
import PanGraphic from "./panGraphic.js";
import Recipe from "../shared/recipecard.js";
import axios from "axios";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredRecipes: null,
    };
  }

  componentDidMount() {
    axios.get("/getFeaturedRecipes").then((data) => {
      this.setState({
        featuredRecipes: data.data.results,
      });
    });
  }

  render() {
    if (this.state.featuredRecipes === null) {
      return null;
    }
    return (
      <>
        <PanGraphic />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {this.state.featuredRecipes.map((recipe) => {
            return (
              <Recipe
                key ={recipe.id}
                handleButtonPress={this.props.handleButtonPress}
                user={this.props.user}
                recipe={recipe}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default Landing;
