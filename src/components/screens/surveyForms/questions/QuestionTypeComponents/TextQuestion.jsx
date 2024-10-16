import {RemoveCircleOutline} from '@mui/icons-material'
import {FormControlLabel, Grid, Link, IconButton} from '@mui/material'
import React, {useState} from 'react'
import {AUDIENCE} from '../../../../../utils/constants'
import WbTextField from '../../../../common/WbTextField'
import WbSwitch from '../../../../common/WbSwitch'

export default function ({question, updateQuestion, audience, isPriority}) {
  const [copy, setCopy] = useState(true)

  return (
    <>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12} ml={1}>
          <FormControlLabel
            label="Limit character length"
            control={
              <WbSwitch
                size="small"
                disabled={!isPriority}
                checked={question.hasCharacterLimit}
                onChange={e => {
                  updateQuestion({
                    ...question,
                    openResponseAttributes: {
                      ...question.openResponseAttributes,
                      hasCharacterLimit: e.target.checked,
                    },
                    questionSettings: {...question.questionSettings},
                  })
                }}
              ></WbSwitch>
            }
          ></FormControlLabel>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <WbTextField
            disabled={
              !question.openResponseAttributes.hasCharacterLimit || !isPriority
            }
            label={'Min'}
            type={'number'}
            InputProps={{
              inputProps: {
                max: 1000,
                min: 0,
              },
            }}
            placeholder={'Min character length'}
            value={question.openResponseAttributes.minCharacterLimit}
            onChange={e => {
              updateQuestion({
                ...question,
                questionSettings: {...question.questionSettings},
                openResponseAttributes: {
                  ...question.openResponseAttributes,
                  minCharacterLimit: parseInt(e.target.value),
                },
              })
            }}
          ></WbTextField>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <WbTextField
            disabled={
              !question.openResponseAttributes.hasCharacterLimit || !isPriority
            }
            value={question.openResponseAttributes.maxCharacterLimit}
            InputProps={{
              inputProps: {
                max: 1000,
                min: question.openResponseAttributes.minCharacterLimit,
              },
            }}
            type={'number'}
            label={'Max'}
            placeholder={'Max character length'}
            onChange={e => {
              updateQuestion({
                ...question,
                questionSettings: {...question.questionSettings},
                openResponseAttributes: {
                  ...question.openResponseAttributes,
                  maxCharacterLimit: parseInt(e.target.value),
                },
              })
            }}
          ></WbTextField>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <WbTextField
            value={
              audience === AUDIENCE.STAFF
                ? question.staffText
                : audience === AUDIENCE.PARENT
                  ? question.parentText
                  : question.pupilText
            }
            //placeholder="Enter your question text"
            onChange={e => {
              let q = question
              let text = e.target.value
              if (isPriority) {
                if (audience === AUDIENCE.STAFF) {
                  if (q.pupilText === q.staffText) q.pupilText = text
                  if (q.parentText === q.staffText) q.parentText = text
                  q.staffText = text
                }
                if (audience === AUDIENCE.PARENT) {
                  if (q.pupilText === q.parentText) q.pupilText = text
                  q.parentText = text
                }
                if (audience === AUDIENCE.STUDENT) {
                  q.pupilText = text
                }
              } else {
                if (audience === AUDIENCE.STAFF) q.staffText = text
                if (audience === AUDIENCE.PARENT) q.parentText = text
                if (audience === AUDIENCE.STUDENT) q.pupilText = text
              }
              updateQuestion(q)
            }}
            label="Add question"
          ></WbTextField>
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          mb={1}
          mt={1}
          textAlign="right"
        >
          <div className="meta-text">
            <Link
              href="#"
              underline="hover"
              onClick={e => {
                updateQuestion({
                  ...question,
                  hasDescription: !question.hasDescription,
                  questionSettings: {...question.questionSettings},
                  openResponseAttributes: {...question.openResponseAttributes},
                })
              }}
              disabled={!isPriority}
            >
              {question.hasDescription ? 'Remove ' : 'Add '} description{' '}
            </Link>
          </div>
        </Grid>
      </Grid>
      {question.hasDescription && (
        <Grid container spacing={1} alignItems="center">
          <Grid item lg={11} md={11} sm={11} xs={11}>
            <WbTextField
              label={'Description'}
              value={
                audience === AUDIENCE.STAFF
                  ? question.staffDescription
                  : audience === AUDIENCE.PARENT
                    ? question.parentDescription
                    : question.pupilDescription
              }
              placeholder="Enter your description"
              onChange={e => {
                let q = question
                if (isPriority) {
                  if (audience === AUDIENCE.STAFF) {
                    if (q.pupilDescription === q.staffDescription)
                      q.pupilDescription = e.target.value
                    if (q.parentDescription === q.staffDescription)
                      q.parentDescription = e.target.value
                    q.staffDescription = e.target.value
                  }
                  if (audience === AUDIENCE.PARENT) {
                    if (q.pupilDescription === q.parentDescription)
                      q.pupilDescription = e.target.value
                    q.parentDescription = e.target.value
                  }
                  if (audience === AUDIENCE.STUDENT) {
                    q.pupilDescription = e.target.value
                  }
                } else {
                  if (audience === AUDIENCE.STAFF)
                    q.staffDescription = e.target.value
                  if (audience === AUDIENCE.PARENT)
                    q.parentDescription = e.target.value
                  if (audience === AUDIENCE.STUDENT)
                    q.pupilDescription = e.target.value
                }
                updateQuestion({
                  ...q,
                  questionSettings: {...question.questionSettings},
                  openResponseAttributes: {...question.openResponseAttributes},
                })
              }}
              fullWidth
            ></WbTextField>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1}>
            <IconButton
              onClick={e => {
                let q = question
                q.staffDescription = null
                q.parentDescription = null
                q.hasDescription = false
                q.pupilDescription = null
                updateQuestion(q)
              }}
              disabled={!isPriority}
            >
              <RemoveCircleOutline className="icon-delete" />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </>
  )
}
