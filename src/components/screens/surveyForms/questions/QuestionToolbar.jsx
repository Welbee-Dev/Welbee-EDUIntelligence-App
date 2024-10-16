import React, {useState} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import {Inventory, QuestionAnswer} from '@mui/icons-material'
import SettingsIcon from '@mui/icons-material/Settings'

export default function QuestionToolbar({view, setView}) {
  return (
    <div className="side-nav">
      <ToggleButtonGroup
        exclusive
        value={view}
        onChange={(event, newValue) => {
          setView(newValue)
        }}
        orientation="vertical"        
      >
        <ToggleButton value="main">
          <QuestionAnswer></QuestionAnswer>
          <span>Your Questions</span>
        </ToggleButton>

        <ToggleButton value="library">
          <Inventory></Inventory>{' '}
          <span>Question Bank</span>
        </ToggleButton>

        <ToggleButton value="settings">
          <SettingsIcon></SettingsIcon>
          <span>Survey Settings</span>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
