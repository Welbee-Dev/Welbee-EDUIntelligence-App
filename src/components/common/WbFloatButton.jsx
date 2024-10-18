import * as React from 'react'
import {Fab} from '@mui/material'
import ReviewsSharpIcon from '@mui/icons-material/ReviewsSharp';

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
    bgcolor: '#007A7A',
    '&:hover': {
      bgcolor: '#45338C',
    },
  };

export default function WbFloatButton() {
  return (
    <Fab color="primary" aria-label="chatbot" size="medium" sx={fabStyle}>
        <ReviewsSharpIcon />
    </Fab>
  )
}