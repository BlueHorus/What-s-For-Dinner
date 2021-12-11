import React from 'react'

const FavoriteButton = (props) => {
  if (props.user === null) {
    return (
      <button className='favorite-button'  disabled>
      </button>
      )
    }
  if (props.user.favRecipes.indexOf(props.recipe.id) !== 0) {
  return (
    <button className='favorite-button' onClick={() => props.handleButtonPress(props.recipe.id)}>
    </button>
    )
  } else {
    return (<button className='favorite-button-clicked' onClick={() => props.handleButtonPress(props.recipe.id)}>
    </button>
    )
  }
}




export default FavoriteButton