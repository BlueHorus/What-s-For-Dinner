import React from 'react'

const DownVoteButton = (props) => {
  if (props.user === null) {
    return (
      <button className='downvote-button'  disabled>
      </button>
      )
  } else {
  return (
    <button id={props.buttonId} className='downvote-button' onClick={() => {
      document.getElementById(`${props.buttonId}`).disabled = true;
      props.handleButtonPress(props.recipe.id)
    }}>
    </button>
    )
  }
}
export default DownVoteButton