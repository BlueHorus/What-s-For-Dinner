import React from 'react'

const UpVoteButton = (props) => {
  if (props.user === null) {
    return (
      <button className='upvote-button'  disabled>
      </button>
      )
  }
  return (
    <button id={props.buttonId} className='upvote-button' onClick={() => {
      document.getElementById(`${props.buttonId}`).disabled = true;
      props.handleButtonPress(props.recipe.id)
    }}>
    </button>
    )

}



export default UpVoteButton