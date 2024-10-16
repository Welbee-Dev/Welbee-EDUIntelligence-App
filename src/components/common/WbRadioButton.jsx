import * as React from 'react'
import {styled} from '@mui/material/styles'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'

const CustomRadioIcon = styled('span')(({theme}) => ({
  borderRadius: '50%',
  width: 22,
  height: 22,  
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: "theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5'",
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark'
        ? 'rgba(57,75,89,.5)'
        : 'rgba(206,217,224,.5)',
  },
  
  
}))

const CustomRadioCheckedIcon = styled(CustomRadioIcon)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  boxShadow: 'inset 0 0 0 2px #007A7A',  
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',    
    width: 22,
    height: 22,
    backgroundImage: 'radial-gradient(#007A7A,#007A7A 28%,transparent 32%)',    
    content: '""',
  },
  // 'input:hover ~ &': {
  //   backgroundColor: '#007A7A',
  // },
}))

function CustomRadioButton(props) {
  return (
    <Radio
      disableRipple      
      checkedIcon={<CustomRadioCheckedIcon />}
      icon={<CustomRadioIcon />}
      {...props}
    />
  )
}

export default function WbRadioButton({value, label, onChange, checked}) {
  return (
    <FormControlLabel
      value={value}
      control={<CustomRadioButton />}
      label={label}
      onChange={onChange}
      checked={checked}
    />
  )
}
