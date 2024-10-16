import React, {useEffect, useState} from 'react'
import {AUDIENCE} from '../../../../../utils/constants'
import {Grid, Stack} from '@mui/material'
import {DragIndicator} from '@mui/icons-material'
import questionResponseTemplate from '../../../../../utils/questionResponseTemplate'

export default function RankingQuestionRender({
  question,
  audience,
  updateAnswers,
}) {
  const [options, setOptions] = useState([])
  const [response, setResponse] = useState({
    ...questionResponseTemplate,
    questionId: question.id,
    hasNumValue: question.hasCustomValue,
    participantTypeText:
      audience === AUDIENCE.STAFF
        ? 'Staff'
        : audience === AUDIENCE.PARENT
          ? 'Parent'
          : 'Pupil',
    questionTypeText: 'Ranking',
  })

  useEffect(() => {
    setOptions([...question.multiOptionResponseAttributes])
  }, [question])

  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <h1>
          {AUDIENCE.STAFF === audience
            ? question.staffText
            : AUDIENCE.PARENT == audience
              ? question.parentText
              : question.pupilText}
        </h1>
      </Grid>
      {question.hasDescription && (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <p>
            {AUDIENCE.STAFF === audience
              ? question.staffDescription
              : AUDIENCE.PARENT == audience
                ? question.parentDescription
                : question.pupilDescription}
          </p>
        </Grid>
      )}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Stack spacing={1} draggable>
          {options.map((option, index) => (
            <div
              draggable
              style={{padding: 12, backgroundColor: 'rgba(0,0,0,0.10)'}}
              id={index}
              onDragStart={e => {
                e.dataTransfer.setData('text/plain', index)
                e.dataTransfer.effectAllowed = 'link'
                e.dataTransfer.dropEffect = 'none'
              }}
              onDrop={e => {
                e.target.style.cursor = 'grab'
                let from = e.dataTransfer.getData('text/plain')
                let to = index
                if (from === to) return
                let newOptions = [...options]
                let temp = {...newOptions[from]}
                newOptions[from] = {...newOptions[to]}
                newOptions[to] = {...temp}
                setOptions([...newOptions])
                let resp = response
                newOptions.map((option, index) => {
                  resp[`valueText${index + 1}`] =
                    audience === AUDIENCE.STAFF
                      ? option.staffText
                      : AUDIENCE.PARENT == audience
                        ? option.parentText
                        : option.pupilText
                  resp[`value${index + 1}`] = option.value
                  resp[`numValue${index + 1}`] = question.hasCustomValue
                    ? audience === AUDIENCE.STAFF
                      ? option.staffCustomValue
                      : AUDIENCE.PARENT == audience
                        ? option.parentCustomValue
                        : option.pupilCustomValue
                    : null
                })
                updateAnswers({...resp})
              }}
              onDragOver={e => {
                e.preventDefault()
              }}
            >
              <Grid container alignItems="center">
                <Grid item lg={11} md={11} sm={11} xs={11} textAlign="left">
                  {AUDIENCE.STAFF === audience
                    ? option.staffText
                    : AUDIENCE.PARENT == audience
                      ? option.parentText
                      : option.pupilText}
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={1}>
                  <DragIndicator></DragIndicator>
                </Grid>
              </Grid>
            </div>
          ))}
        </Stack>
      </Grid>
    </Grid>
  )
}
