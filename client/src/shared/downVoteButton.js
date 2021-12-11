import React from 'react'

const DownVoteButton = (props) => {
  if (props.user === null) {
    return (
      <button className='downvote-button'  disabled>
      </button>
      )
  } else {
  return (
    <button className='downvote-button' onClick={() => props.handleButtonPress(props.recipe.id)}>
    </button>
    )
  }
}
export default DownVoteButton