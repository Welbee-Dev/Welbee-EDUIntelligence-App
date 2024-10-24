import * as React from 'react'
import {styled} from '@mui/material/styles'
import TextField from '@mui/material/TextField'

const CustomTextField = styled(props => (
  <TextField
    InputProps={{disableUnderline: true}}
    {...props}
  />
))(({theme}) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 0,
    backgroundColor: '#ffffff',
    border: '1px solid',
    borderColor: '#e2e2e2',    
    fontSize: '14px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    '&::before': {
      borderBottom: 0,
    },
    '&:hover::before': {
      borderBottom: '0 !important',
    },
    '&.Mui-focused::after': {
      borderBottom: 0,
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      //boxShadow: `#E84F6B 0 0 0 2px`,
      borderColor: '#53B5E0',
    },
  },
  '& label.Mui-focused': {
    color: '#53B5E0',
  },
}))

export default function WbTextField({label, id, ...props}) {
  return (
    <CustomTextField
      label={label}
      id={id}
      variant="filled"
      fullWidth
      size="small"      
      {...props}
    />
  )
}
