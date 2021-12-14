import React from 'react'
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const UpVoteButton = (props) => {
  if (props.user === null) {
    return (
      <IconButton id='upvote-button'  disabled>
        <ThumbUpIcon />
      </IconButton>
      )
  }
  return (
    <IconButton  id='upvote-button' size='large' onClick={() => {
      props.handleButtonPress(props.recipe.id)
    }}>
      <ThumbUpIcon></ThumbUpIcon>
    </IconButton>
    )

}



export default UpVoteButton