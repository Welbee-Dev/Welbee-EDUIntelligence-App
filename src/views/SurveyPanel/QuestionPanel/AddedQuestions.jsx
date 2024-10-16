import {Fade, Menu, MenuItem, Stack} from '@mui/material'
import React, {useState} from 'react'
import WbButton from '../../../components/common/WbButton'
import {QUESTION_TYPE_SELECT} from '../../../utils/constants'
import getQuestionTemplate from '../../../utils/questionTemplates'
import useCustomerData from '../../../hooks/useCustomerData'

export default function AddedQuestions({onChange}) {
  const customer = useCustomerData()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleAddNewQuestion = val => {
    setAnchorEl(null)
    let question = {...getQuestionTemplate(val)}
    onChange(question)
  }

  return (
    <Stack direction="row" justifyContent="center">
      <WbButton
        sx={{width: '250px', marginBottom: '20px', marginTop: '20px'}}
        CustomButtonText={'Add new question'}
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      ></WbButton>
      <Menu
        className="question-type-dropdown"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={e => {
          setAnchorEl(null)
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        TransitionComponent={Fade}
      >
        {QUESTION_TYPE_SELECT.map((type, index) => (
          <MenuItem
            onClick={e => handleAddNewQuestion(type.value)}
            key={type.value}
          >
            {type.image}
            {type.label}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
}
