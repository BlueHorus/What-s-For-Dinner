import * as React from 'react'
import Recipe from '../shared/recipecard.js'
import axios from 'axios'
import Fridge from './sadFridge.js'

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
      return <Fridge width='500px' height='500px' style={{marginTop: '100px'}}/>
    }
    if (this.state.recipes === null || this.state.recipes.length === 0) {
      return <Fridge width='500px' height='500px' style={{marginTop: '100px'}}/>;
    }
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
      <>
      <div id='my-recipes-banner'>
        My Recipes
      </div>
      <div>
        {this.renderView()}
      </div>
      </>
    )
  }
}

export default FavoriteRecipes