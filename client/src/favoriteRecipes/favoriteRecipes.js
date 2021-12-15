import * as React from 'react'
import Recipe from '../shared/recipecard.js'
import axios from 'axios'

class FavoriteRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: null
    }
  }

  componentDidMount() {
    let config = {
      method: 'get',
      url: '/getUsersFavorites',
      data: {
        uid: this.props.user._id
      },
      headers: {
        Authorization: this.props.token
    }
  }
    axios(config)
    .then((results) => {
      console.log(results)
      this.setState({
        recipes: results.data.results
      })
    })
    .catch((err) => console.log(err))
  }


  renderView() {
    if (!this.props.user) {
      return null
    }
    if (this.state.recipes === null) {
      return null;
    }
    console.log(this.state.recipes)
    return (
      <div>
        {this.state.recipes.map((recipe) => {
          return (<Recipe recipe={recipe} user={this.props.user} handleButtonPress={this.props.handleButtonPress}/>)
        })}
      </div>
    )
}




  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}

export default FavoriteRecipes