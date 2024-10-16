import * as React from 'react'
import {alpha, styled} from '@mui/material/styles'
import Switch from '@mui/material/Switch'

const CustomSwitch = styled(Switch)(({theme}) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#007A7A',
    '&:hover': {
      backgroundColor: alpha('#007A7A', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#007A7A',
  },
}))

export default function WbSwitch({...label}) {
  return <CustomSwitch {...label} />
}
