import React from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Tooltip from '@mui/material/Tooltip';

const DownVoteButton = (props) => {
  return (
    <Tooltip title="Downvote">
      <IconButton id='downvote-button' size='large' onClick={() => {
        props.handleButtonPress(props.recipe.id)
      }}>
        <ThumbDownIcon id='downvote-button' style={{width: '20px', height: '20px'}} onClick={() => {
        props.handleButtonPress(props.recipe.id)
      }}/>
      </IconButton>
    </Tooltip>
    )
}
export default DownVoteButton