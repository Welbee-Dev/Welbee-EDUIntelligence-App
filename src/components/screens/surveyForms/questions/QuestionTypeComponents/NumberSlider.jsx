import {RemoveCircleOutline} from '@mui/icons-material'
import {Grid, Link, FormControlLabel, IconButton, MenuItem} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {AUDIENCE, QUESTION_TYPE} from '../../../../../utils/constants'
import WbTextField from '../../../../common/WbTextField'
import WbSwitch from '../../../../common/WbSwitch'
export default function NumberSlider({
  question,
  updateQuestion,
  audience,
  isPriority,
}) {
  useEffect(() => {}, [question])

  const setAskFollowUpOperator = value => {
    updateQuestion({
      ...question,
      followupQuestions: [
        {...question.followupQuestions[0], followupValueOperator: value},
      ],
      sliderResponseAttributes: {
        ...question.sliderResponseAttributes,
      },
    })
  }

  const setHasFollowup = value => {
    updateQuestion({
      ...question,
      hasFollowup: value,
      followupQuestions: [{...question.followupQuestions[0]}],
      sliderResponseAttributes: {
        ...question.sliderResponseAttributes,
      },
      questionSettings: {...question.questionSettings},
    })
  }

  const setFollowupText = value => {
    if (isPriority) {
      updateQuestion({
        ...question,
        followupQuestions: [
          {
            ...question.followupQuestions[0],
            staffFollowupText: value,
            pupilFollowupText: value,
            parentFollowupText: value,
          },
        ],
        sliderResponseAttributes: {
          ...question.sliderResponseAttributes,
        },
      })
    } else {
      if (audience === AUDIENCE.STAFF) {
        updateQuestion({
          ...question,
          followupQuestions: [
            {...question.followupQuestions[0], staffFollowupText: value},
          ],
          sliderResponseAttributes: {
            ...question.sliderResponseAttributes,
          },
        })
      }
      if (audience === AUDIENCE.PARENT) {
        updateQuestion({
          ...question,
          followupQuestions: [
            {...question.followupQuestions[0], parentFollowupText: value},
          ],
          sliderResponseAttributes: {
            ...question.sliderResponseAttributes,
          },
        })
      }
      if (audience === AUDIENCE.STUDENT) {
        updateQuestion({
          ...question,
          followupQuestions: [
            {...question.followupQuestions[0], pupilFollowupText: value},
          ],
          sliderResponseAttributes: {
            ...question.sliderResponseAttributes,
          },
        })
      }
    }
  }

  const setFollowupValue = value => {
    updateQuestion({
      ...question,
      sliderResponseAttributes: {...question.sliderResponseAttributes},
      followupQuestions: [
        {
          ...question.followupQuestions[0],
          followupValue: parseInt(value),
        },
      ],
    })
  }
  const setLabels = (type, value) => {
    let q = {
      ...question,
      sliderResponseAttributes: {...question.sliderResponseAttributes},
      followupQuestions: [...question.followupQuestions],
    }
    if ('desc' === type) {
      if (isPriority) {
        if (audience === AUDIENCE.STAFF) {
          if (q.pupilDescription === q.staffDescription)
            q.pupilDescription = value
          if (q.parentDescription === q.staffDescription)
            q.parentDescription = value
          q.staffDescription = value
        }
        if (audience === AUDIENCE.PARENT) {
          if (q.pupilDescription === q.parentDescription)
            q.pupilDescription = value
          q.parentDescription = value
        }
        if (audience === AUDIENCE.STUDENT) {
          if (q.parentDescription === q.pupilDescription)
            q.pupilDescription = value
        }
      } else {
        if (audience === AUDIENCE.STAFF) q.staffDescription = value
        if (audience === AUDIENCE.PARENT) q.parentDescription = value
        if (audience === AUDIENCE.STUDENT) q.pupilDescription = value
      }
    }
    if ('high' === type) {
      if (isPriority) {
        if (audience === AUDIENCE.STAFF) {
          if (
            q.sliderResponseAttributes.pupilHighScaleLabel ===
            q.sliderResponseAttributes.staffHighScaleLabel
          )
            q.sliderResponseAttributes.pupilHighScaleLabel = value
          if (
            q.sliderResponseAttributes.parentHighScaleLabel ===
            q.sliderResponseAttributes.staffHighScaleLabel
          )
            q.sliderResponseAttributes.parentHighScaleLabel = value
          q.sliderResponseAttributes.staffHighScaleLabel = value
        }
        if (audience === AUDIENCE.PARENT) {
          if (
            q.sliderResponseAttributes.pupilHighScaleLabel ===
            q.sliderResponseAttributes.parentHighScaleLabel
          )
            q.sliderResponseAttributes.pupilHighScaleLabel = value
          q.sliderResponseAttributes.parentHighScaleLabel = value
        }
        if (audience === AUDIENCE.STUDENT) {
          q.sliderResponseAttributes.pupilHighScaleLabel = value
        }
      } else {
        if (audience === AUDIENCE.STAFF)
          q.sliderResponseAttributes.staffHighScaleLabel = value
        if (audience === AUDIENCE.PARENT)
          q.sliderResponseAttributes.parentHighScaleLabel = value
        if (audience === AUDIENCE.STUDENT)
          q.sliderResponseAttributes.pupilHighScaleLabel = value
      }
    }
    if ('mid' === type) {
      if (isPriority) {
        if (audience === AUDIENCE.STAFF) {
          if (
            q.sliderResponseAttributes.pupilMidScaleLabel ===
            q.sliderResponseAttributes.staffMidScaleLabel
          )
            q.sliderResponseAttributes.pupilMidScaleLabel = value
          if (
            q.sliderResponseAttributes.parentMidScaleLabel ===
            q.sliderResponseAttributes.staffMidScaleLabel
          )
            q.sliderResponseAttributes.parentMidScaleLabel = value
          q.sliderResponseAttributes.staffMidScaleLabel = value
        }
        if (audience === AUDIENCE.PARENT) {
          if (
            q.sliderResponseAttributes.pupilMidScaleLabel ===
            q.sliderResponseAttributes.parentMidScaleLabel
          )
            q.sliderResponseAttributes.pupilMidScaleLabel = value
          q.sliderResponseAttributes.parentMidScaleLabel = value
        }
        if (audience === AUDIENCE.STUDENT) {
          q.sliderResponseAttributes.pupilMidScaleLabel = value
        }
      } else {
        if (audience === AUDIENCE.STAFF)
          q.sliderResponseAttributes.staffMidScaleLabel = value
        if (audience === AUDIENCE.PARENT)
          q.sliderResponseAttributes.parentMidScaleLabel = value
        if (audience === AUDIENCE.STUDENT)
          q.sliderResponseAttributes.pupilMidScaleLabel = value
      }
    }
    if ('low' === type) {
      if (isPriority) {
        if (audience === AUDIENCE.STAFF) {
          if (
            q.sliderResponseAttributes.pupilLowScaleLabel ===
            q.sliderResponseAttributes.staffLowScaleLabel
          )
            q.sliderResponseAttributes.pupilLowScaleLabel = value
          if (
            q.sliderResponseAttributes.parentLowScaleLabel ===
            q.sliderResponseAttributes.staffLowScaleLabel
          )
            q.sliderResponseAttributes.parentLowScaleLabel = value
          q.sliderResponseAttributes.staffLowScaleLabel = value
        }
        if (audience === AUDIENCE.PARENT) {
          if (
            q.sliderResponseAttributes.pupilLowScaleLabel ===
            q.sliderResponseAttributes.parentLowScaleLabel
          )
            q.sliderResponseAttributes.pupilLowScaleLabel = value
          q.sliderResponseAttributes.parentLowScaleLabel = value
        }
        if (audience === AUDIENCE.STUDENT) {
          q.sliderResponseAttributes.pupilLowScaleLabel = value
        }
      } else {
        if (audience === AUDIENCE.STAFF)
          q.sliderResponseAttributes.staffLowScaleLabel = value
        if (audience === AUDIENCE.PARENT)
          q.sliderResponseAttributes.parentLowScaleLabel = value
        if (audience === AUDIENCE.STUDENT)
          q.sliderResponseAttributes.pupilLowScaleLabel = value
      }
    }
    updateQuestion({
      ...q,
      sliderResponseAttributes: q.sliderResponseAttributes,
      followupQuestions: [...q.followupQuestions],
    })
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <WbTextField
            value={
              audience === AUDIENCE.STAFF
                ? question.staffText
                : audience === AUDIENCE.PARENT
                  ? question.parentText
                  : question.pupilText
            }
            label="Enter your question text"
            onChange={e => {
              let q = {
                ...question,
                followupQuestions: [...question.followupQuestions],
                sliderResponseAttributes: {
                  ...question.sliderResponseAttributes,
                },
              }
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
                  if (q.parentText === q.pupilText) q.pupilText = text
                }
              } else {
                if (audience === AUDIENCE.STAFF) q.staffText = text
                if (audience === AUDIENCE.PARENT) q.parentText = text
                if (audience === AUDIENCE.STUDENT) q.pupilText = text
              }

              updateQuestion({
                ...q,
                sliderResponseAttributes: q.sliderResponseAttributes,
                followupQuestions: [...q.followupQuestions],
              })
            }}
            fullWidth
          ></WbTextField>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" my={1}>
          <div className="meta-text">
            <Link
              href="#"
              underline="hover"
              onClick={e => {
                let q = {
                  ...question,
                  ...question.sliderResponseAttributes,
                  followupQuestions: [{...question.followupQuestions[0]}],
                }
                q.hasDescription = !q.hasDescription
                updateQuestion({
                  ...q,
                  sliderResponseAttributes: q.sliderResponseAttributes,
                  followupQuestions: [...q.followupQuestions],
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
              value={
                audience === AUDIENCE.STAFF
                  ? question.staffDescription
                  : audience === AUDIENCE.PARENT
                    ? question.parentDescription
                    : question.pupilDescription
              }
              label="Description"
              onChange={e => setLabels('desc', e.target.value)}
              fullWidth
            ></WbTextField>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1}>
            <IconButton
              onClick={e => {
                let q = question
                q.description = null
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

      {question.questionType === QUESTION_TYPE.NUMBER_SLIDER && (
        <Grid container spacing={1}>
          <Grid item lg={12} md={12} sm={12} xs={12} mt={2}>
            <label>Set slider range</label>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <WbTextField
              disabled={!isPriority}
              type="number"
              label="From"
              value={question.sliderResponseAttributes?.rangeFrom}
              onChange={e => {
                let q = {
                  ...question,
                  sliderResponseAttributes: {
                    ...question.sliderResponseAttributes,
                  },
                }
                q.sliderResponseAttributes.rangeFrom = parseInt(e.target.value)
                updateQuestion({
                  ...q,
                  sliderResponseAttributes: q.sliderResponseAttributes,
                })
              }}
            ></WbTextField>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <WbTextField
              disabled={!isPriority}
              type="number"
              label="To"
              value={question.sliderResponseAttributes.rangeTo}
              onChange={e => {
                let q = {
                  ...question,
                  sliderResponseAttributes: {
                    ...question.sliderResponseAttributes,
                    rangeTo: parseInt(e.target.value),
                  },
                }
                q.sliderResponseAttributes.rangeTo = parseInt(e.target.value)
                updateQuestion({
                  ...q,
                  sliderResponseAttributes: q.sliderResponseAttributes,
                })
              }}
            ></WbTextField>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12} mt={2}>
          <label>Scale range Text</label>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <WbTextField
            label="High Text"
            fullWidth
            value={
              audience === AUDIENCE.STAFF
                ? question.sliderResponseAttributes.staffHighScaleLabel
                : audience === AUDIENCE.PARENT
                  ? question.sliderResponseAttributes.parentHighScaleLabel
                  : question.sliderResponseAttributes.pupilHighScaleLabel
            }
            onChange={e => setLabels('high', e.target.value)}
          ></WbTextField>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <WbTextField
            label="Middle Text"
            fullWidth
            value={
              audience === AUDIENCE.STAFF
                ? question.sliderResponseAttributes.staffMidScaleLabel
                : audience === AUDIENCE.PARENT
                  ? question.sliderResponseAttributes.parentMidScaleLabel
                  : question.sliderResponseAttributes.pupilMidScaleLabel
            }
            onChange={e => setLabels('mid', e.target.value)}
          ></WbTextField>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <WbTextField
            label="Low Text"
            fullWidth
            value={
              audience === AUDIENCE.STAFF
                ? question.sliderResponseAttributes.staffLowScaleLabel
                : audience === AUDIENCE.PARENT
                  ? question.sliderResponseAttributes.parentLowScaleLabel
                  : question.sliderResponseAttributes.pupilLowScaleLabel
            }
            onChange={e => setLabels('low', e.target.value)}
          ></WbTextField>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} ml={1} mt={2}>
          <FormControlLabel
            control={
              <WbSwitch
                disabled={!isPriority}
                size="small"
                checked={question.hasFollowup}
                onChange={e => setHasFollowup(e.target.checked)}
              />
            }
            label="Ask follow up question"
          ></FormControlLabel>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <WbTextField
            select
            disabled={!question.hasFollowup || !isPriority}
            label="Set Option"
            defaultValue={null}
            value={question.followupQuestions[0]?.followupValueOperator}
            onChange={e => setAskFollowUpOperator(e.target.value)}
          >
            <MenuItem value={1}>Higher than</MenuItem>
            <MenuItem value={2}>Lower than</MenuItem>
            <MenuItem value={3}>Equals to</MenuItem>
            <MenuItem value={4}>Lower than or equals to</MenuItem>
            <MenuItem value={5}>Higher than or equals to</MenuItem>
          </WbTextField>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <WbTextField
            disabled={!question.hasFollowup || !isPriority}
            type="number"
            label="Set Value"
            value={question.followupQuestions[0]?.followupValue}
            onChange={e => setFollowupValue(e.target.value)}
          ></WbTextField>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <WbTextField
            disabled={!question.hasFollowup}
            label={'Follow up question text'}
            fullWidth
            value={
              audience === AUDIENCE.STAFF
                ? question.followupQuestions[0]?.staffFollowupText
                : audience === AUDIENCE.PARENT
                  ? question.followupQuestions[0]?.parentFollowupText
                  : question.followupQuestions[0]?.pupilFollowupText
            }
            onChange={e => setFollowupText(e.target.value)}
            //disabled={question.freeTextValue === null}
          ></WbTextField>
        </Grid>
      </Grid>
    </>
  )
}
