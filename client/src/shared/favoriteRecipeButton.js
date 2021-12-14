import React from 'react'
import IconButton from '@mui/material/IconButton';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const FavoriteButton = (props) => {
  if (props.user === null) {
    return (
      <IconButton id='favorite-button'  size='large' disabled>
        <StarOutlineIcon />
      </IconButton>
      )
    }
  if (props.user.favRecipes.indexOf(props.recipe.id) !== 0) {
  return (
    <IconButton id='favorite-button' size='large'  onClick={() => props.handleButtonPress(props.recipe.id)}>
      <StarOutlineIcon />
    </IconButton>
    )
  } else {
    return (<IconButton id='favorite-button-clicked' size='large' onClick={() => props.handleButtonPress(props.recipe.id)}>
      <StarOutlineIcon />
    </IconButton>
    )
  }
}




export default FavoriteButton