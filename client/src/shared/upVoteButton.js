import React from 'react'
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Tooltip from '@mui/material/Tooltip';

const UpVoteButton = (props) => {
  return (
    <Tooltip title='Upvote'>
      <IconButton  id='upvote-button' size='large' onClick={() => {
        props.handleButtonPress(props.recipe.id)
      }}>
        <ThumbUpIcon id='upvote-button' style={{width: '20px', height: '20px'}} onClick={() => {
        props.handleButtonPress(props.recipe.id)
      }} />
      </IconButton>
    </Tooltip>
    )
  }



export default UpVoteButton