import {Tab} from '@mui/material'
import React from 'react'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function WbTab({value, label, onClick, ...props}) {
  return (
    <Tab
      {...a11yProps(value)}
      label={label}
      onClick={onClick}
      disableRipple
      {...props}
    ></Tab>
  )
}
