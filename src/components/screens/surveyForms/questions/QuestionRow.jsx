import {Divider, Stack} from '@mui/material'
import React from 'react'

export default function QuestionRow({text, index, onChange}) {
  return (
    <div className="questions-list" onClick={e => onChange(index)}>
      <div className="question-no">{index + 1}</div>
      <Divider orientation="vertical" variant="middle" flexItem />{' '}
      <div className="question-txt">{text}</div>
    </div>
  )
}
