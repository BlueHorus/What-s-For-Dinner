import React from 'react'

const UpVoteButton = (props) => {
  if (props.user === null) {
    return (
      <button className='upvote-button'  disabled>
      </button>
      )
  }
  return (
    <button className='upvote-button' onClick={() => props.handleButtonPress(props.recipe.recipeId)}>
    </button>
    )
}



export default UpVoteButton