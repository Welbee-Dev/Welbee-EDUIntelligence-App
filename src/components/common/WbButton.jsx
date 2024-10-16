import * as React from 'react'
import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button'

const CustomButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  fontFamily: 'Inter, sans-serif',
  padding: '8px 15px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#E84F6B',
  borderColor: '#E84F6B',
  borderRadius: '0',
  '&:hover': {
    backgroundColor: '#E82347',
    borderColor: '#E82347',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#E84F6B',
    borderColor: '#E84F6B',
  },
  '&:focus': {
    //boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
})

export default function WbButton({CustomButtonText, onClick, ...props}) {
  return (
    <CustomButton
      variant="contained"
      disableRipple
      onClick={onClick}
      {...props}
    >
      {CustomButtonText}
    </CustomButton>
  )
}
