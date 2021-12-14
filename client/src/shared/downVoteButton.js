import React from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const DownVoteButton = (props) => {
  if (props.user === null) {
    return (
      <IconButton id='downvote-button'  disabled>
        <ThumbDownIcon/>
      </IconButton>
      )
  } else {
  return (
    <IconButton id='downvote-button' size='large' onClick={() => {
      props.handleButtonPress(props.recipe.id)
    }}>
      <ThumbDownIcon />
    </IconButton>
    )
  }
}
export default DownVoteButton