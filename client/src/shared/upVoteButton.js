import React from 'react'
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Tooltip from '@mui/material/Tooltip';

const UpVoteButton = (props) => {
  if (props.user === null) {
    return (
      <IconButton id='upvote-button'  disabled>
        <ThumbUpIcon />
      </IconButton>
      )
  }
  return (
    <Tooltip title='Upvote'>
      <IconButton  id='upvote-button' size='large' onClick={() => {
        props.handleButtonPress(props.recipe.id)
      }}>
        <ThumbUpIcon></ThumbUpIcon>
      </IconButton>
    </Tooltip>
    )

}



export default UpVoteButton