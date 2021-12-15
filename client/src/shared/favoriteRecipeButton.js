import React from 'react'
import IconButton from '@mui/material/IconButton';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Tooltip from '@mui/material/Tooltip';
import StarIcon from '@mui/icons-material/Star';

const FavoriteButton = (props) => {
  if (props.user === null) {
    return (
      <IconButton id='favorite-button'  onClick={() => alert('please sign up or login to use this feature')} size='large' >
        <StarOutlineIcon id='favorite-button' style={{width: '20px', height: '20px'}} nClick={() => alert('please sign up or login to use this feature')}/>
      </IconButton>
      )
    }
//   if (props.user.favRecipes.indexOf(props.recipe.id) === -1) {
//   return (
//     <Tooltip title="Add to Favorites">
//       <IconButton id='favorite-button' size='large'  onClick={() => props.handleButtonPress(props.recipe.id)}>
//         <StarOutlineIcon id='favorite-button' style={{width: '20px', height: '20px'}} onClick={() => props.handleButtonPress(props.recipe.id)}/>
//       </IconButton>
//     </Tooltip>
//     )
//  } else {
   return (
     <Tooltip title="Remove Favorite">
       <IconButton id='favorite-button' size='large'  onClick={() => props.handleButtonPress(props.recipe.id)}>
        <StarIcon id='favorite-button' style={{width: '20px', height: '20px'}} onClick={() => props.handleButtonPress(props.recipe.id)}/>
      </IconButton>
     </Tooltip>
   )
 }






export default FavoriteButton