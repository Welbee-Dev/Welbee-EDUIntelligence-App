import {DragIndicator, RemoveCircleOutline} from '@mui/icons-material'
import {
  FormControlLabel,
  Grid,
  Button,
  Divider,
  Tooltip,
  IconButton,
  Link,
  Stack,
  MenuItem,
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import React, {useState} from 'react'
import {AUDIENCE} from '../../../../../utils/constants'
import WbTextField from '../../../../common/WbTextField'
import WbSwitch from '../../../../common/WbSwitch'
import {QUESTION_TYPE} from '../../../../../utils/constants'
import WbFileUpload from '../../../../common/WbFileUpload'

export default function MultipleSelect({
  question,
  updateQuestion,
  audience,
  isPriority,
}) {
  const handleCustomValues = e => {
    let checked = e.target.checked
    let q = question
    q.hasCustomValue = checked

    if (!checked) {
      let options = [...question.multiOptionResponseAttributes]
      options?.map(op => {
        op.customValue = null
        op.pupilCustomValue = null
        op.parentCustomValue = null
      })
      q.options = [...options]
    }
    updateQuestion(q)
  }
  return (
    <>
      <Grid container>
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
                questionSettings: {...question.questionSettings},
                followupQuestions: [...question.followupQuestions],
                multiOptionResponseAttributes: [
                  ...question.multiOptionResponseAttributes,
                ],
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
                  q.pupilText = text
                }
              } else {
                if (audience === AUDIENCE.STAFF) q.staffText = text
                if (audience === AUDIENCE.PARENT) q.parentText = text
                if (audience === AUDIENCE.STUDENT) q.pupilText = text
              }
              updateQuestion({
                ...q,
                questionSettings: {...q.questionSettings},
                followupQuestions: [...q.followupQuestions],
                multiOptionResponseAttributes: [
                  ...q.multiOptionResponseAttributes,
                ],
              })
            }}
          ></WbTextField>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} my={2}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="end"
            className="meta-text"
          >
            <Link
              href="#"
              underline="hover"
              onClick={e => {
                let q = question
                q.hasDescription = !q.hasDescription
                updateQuestion(q)
              }}
              disabled={!isPriority}
            >
              {question.hasDescription ? 'Remove ' : 'Add '} description{' '}
            </Link>

            <Divider orientation="vertical" variant="middle" flexItem />

            <WbFileUpload
              setImageName={url => {
                updateQuestion({
                  ...question,
                  image: url,
                  followupQuestions: [...question.followupQuestions],
                  questionSettings: {...question.questionSettings},
                  multiOptionResponseAttributes: [
                    ...question.multiOptionResponseAttributes,
                  ],
                })
              }}
            ></WbFileUpload>
          </Stack>
        </Grid>
      </Grid>
      {question.hasDescription && (
        <Grid container alignItems="center">
          <Grid item lg={11} md={11} sm={11} xs={11}>
            <WbTextField
              value={
                audience === AUDIENCE.STAFF
                  ? question.staffDescription
                  : audience === AUDIENCE.PARENT
                    ? question.parentDescription
                    : question.pupilDescription
              }
              label="Enter your description"
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
                updateQuestion(q)
              }}
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

      <Grid container alignItems="center" mt={2} mb={1}>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <label>Answer Choices</label>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="end"
            alignItems="center"
          >
            <FormControlLabel
              control={
                <WbSwitch
                  size="small"
                  label="Assign numerical values"
                  onChange={handleCustomValues}
                  checked={question.hasCustomValue}
                  disabled={!isPriority}
                ></WbSwitch>
              }
              label="Assign numerical values"
            ></FormControlLabel>
            <Tooltip
              placement="right"
              arrow
              title="To help with analysis, you can choose to assign a numerical value to each answer. These are not displayed to the survey respondents "
            >
              <HelpIcon sx={{fontSize: '18px', color: '#afafaf'}} />
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={1} mb={1}>
        <Grid item lg={8}>
          <WbTextField
            label="Paricipants can select"
            select
            value={question.questionSettings.multiSelectOperator}
            onChange={e => {
              updateQuestion({
                ...question,
                questionSettings: {
                  ...question.questionSettings,
                  multiSelectOperator: e.target.value,
                },
                followupQuestions: [...question.followupQuestions],
                multiOptionResponseAttributes: [
                  ...question.multiOptionResponseAttributes,
                ],
              })
            }}
          >
            <MenuItem value={1} selected>
              Exactly
            </MenuItem>
            <MenuItem value={2}>At least</MenuItem>
            <MenuItem value={3}>Maximum</MenuItem>
          </WbTextField>
        </Grid>

        <Grid item lg={4}>
          <WbTextField
            select
            label="Value"
            type="number"
            value={question.questionSettings.multiSelectValue}
            onChange={e => {
              updateQuestion({
                ...question,
                questionSettings: {
                  ...question.questionSettings,
                  multiSelectValue: e.target.value,
                },
                followupQuestions: [...question.followupQuestions],
                multiOptionResponseAttributes: [
                  ...question.multiOptionResponseAttributes,
                ],
              })
            }}
          >
            {question.multiOptionResponseAttributes.map((option, e) => (
              <MenuItem value={e + 1}>{e + 1}</MenuItem>
            ))}
          </WbTextField>
        </Grid>
      </Grid>
      {question.multiOptionResponseAttributes.map((option, e) =>
        OptionRow(question, updateQuestion, e, audience, isPriority)
      )}
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button
            variant="text"
            className="add-option"
            disableRipple
            onClick={e => {
              let q = question.multiOptionResponseAttributes
              q.push({...q[q.length - 1]})
              q[q.length - 1].order = q.length
              q[q.length - 1].value = q.length
              updateQuestion({
                ...question,
                multiOptionResponseAttributes: [...q],
                followupQuestions: [...question.followupQuestions],
                questionSettings: {...question.questionSettings},
              })
            }}
            disabled={
              question.multiOptionResponseAttributes.length === 10 ||
              !isPriority
            }
          >
            + Add an answer choice
          </Button>{' '}
        </Grid>
      </Grid>
    </>
  )
}

const OptionRow = (question, updateQuestion, i, audience, isPriority) => {
  return (
    <Grid
      container
      id={i}
      draggable
      onDragStart={e => {
        if (!isPriority) return
        e.dataTransfer.setData('text/plain', i)
        e.dataTransfer.dropEffect = 'copy'
        e.dataTransfer.effectAllowed = 'copyMove'
      }}
      onDragOver={e => {
        if (!isPriority) return
        e.preventDefault()
      }}
      onDrop={e => {
        if (!isPriority) return
        e.preventDefault()
        let from = e.dataTransfer.getData('text/plain')
        let to = i
        let options = [...question.multiOptionResponseAttributes]
        let temp = options[from]
        options[from] = options[to]
        options[to] = temp
        let ff = question.followupQuestions
        if (question.hasFollowup) {
          question.followupQuestions[0].followupValue = temp.value
        }
        options.map((o, idx) => (o.order = idx + 1))
        updateQuestion({
          ...question,
          questionSettings: {...question.questionSettings},
          followupQuestions: [...question.followupQuestions],
          multiOptionResponseAttributes: [...options],
        })
      }}
    >
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Stack direction="row" alignItems="start">
          <IconButton disabled={!isPriority} style={{cursor: 'grab'}}>
            <DragIndicator //</Grid>onPointerDown={e => controls.start(e)}
            ></DragIndicator>
          </IconButton>

          <div className="options-panel">
            <Stack direction="row" spacing={1}>
              <WbTextField
                sx={{width: '80%'}}
                label={'Answer ' + (i + 1)}
                value={
                  audience === AUDIENCE.STAFF
                    ? question.multiOptionResponseAttributes[i].staffText
                    : audience === AUDIENCE.PARENT
                      ? question.multiOptionResponseAttributes[i].parentText
                      : question.multiOptionResponseAttributes[i].pupilText
                }
                onChange={e => {
                  let q = {
                    ...question,
                    questionSettings: {...question.questionSettings},
                    followupQuestions: [...question.followupQuestions],
                    multiOptionResponseAttributes: [
                      ...question.multiOptionResponseAttributes,
                    ],
                  }
                  if (isPriority) {
                    if (audience === AUDIENCE.STAFF) {
                      if (
                        q.multiOptionResponseAttributes[i].pupilText ===
                        q.multiOptionResponseAttributes[i].staffText
                      )
                        q.pupilText = e.target.value
                      if (
                        q.multiOptionResponseAttributes[i].parentText ===
                        q.multiOptionResponseAttributes[i].staffText
                      )
                        q.multiOptionResponseAttributes[i].parentText =
                          e.target.value
                      q.multiOptionResponseAttributes[i].staffText =
                        e.target.value
                    }
                    if (audience === AUDIENCE.PARENT) {
                      if (
                        q.multiOptionResponseAttributes[i].pupilText ===
                        q.multiOptionResponseAttributes[i].parentText
                      )
                        q.multiOptionResponseAttributes[i].pupilText =
                          e.target.value
                      q.multiOptionResponseAttributes[i].parentText =
                        e.target.value
                    }
                    if (audience === AUDIENCE.STUDENT) {
                      q.multiOptionResponseAttributes[i].pupilText =
                        e.target.value
                    }
                  } else {
                    if (audience === AUDIENCE.STAFF)
                      q.multiOptionResponseAttributes[i].staffText =
                        e.target.value
                    if (audience === AUDIENCE.PARENT)
                      q.multiOptionResponseAttributes[i].parentText =
                        e.target.value
                    if (audience === AUDIENCE.STUDENT)
                      q.multiOptionResponseAttributes[i].pupilText =
                        e.target.value
                  }

                  updateQuestion({
                    ...q,
                    questionSettings: {...q.questionSettings},
                    followupQuestions: [...q.followupQuestions],
                    multiOptionResponseAttributes: [
                      ...q.multiOptionResponseAttributes,
                    ],
                  })
                }}
              />

              <WbTextField
                sx={{width: '20%'}}
                value={question.multiOptionResponseAttributes[i].numValue}
                label={'Num ' + (i + 1)}
                disabled={!question.hasCustomValue}
                onChange={e => {
                  let options = [...question.multiOptionResponseAttributes]
                  options[i].numValue = parseInt(e.target.value)
                  updateQuestion({
                    ...question,
                    multiOptionResponseAttributes: [...options],
                    followupQuestions: [...question.followupQuestions],
                    questionSettings: {...question.questionSettings},
                  })
                }}
              />
            </Stack>

            <div className="followup-switch">
              <FormControlLabel
                control={
                  <WbSwitch
                    size="small"
                    checked={
                      question.hasFollowup &&
                      question.followupQuestions.findIndex(
                        x => x.followupValue === i + 1
                      ) > -1
                    }
                    onChange={e => {
                      let q = [...question.followupQuestions]
                      if (e.target.checked) {
                        q = [
                          {
                            followupValue: i + 1,
                            staffFollowupText: null,
                            pupilFollowupText: null,
                            parentFollowupText: null,
                          },
                        ]
                      } else {
                        q = []
                      }
                      updateQuestion({
                        ...question,
                        hasFollowup: e.target.checked,
                        followupQuestions: [...q],
                        questionSettings: {...question.questionSettings},
                        multiOptionResponseAttributes: [
                          ...question.multiOptionResponseAttributes,
                        ],
                      })
                    }}
                    disabled={!isPriority}
                  ></WbSwitch>
                }
                label="Ask follow up question"
              ></FormControlLabel>
            </div>
            {question.hasFollowup &&
              question.followupQuestions.findIndex(
                x => x.followupValue === i + 1
              ) > -1 && (
                <WbTextField
                  sx={{marginTop: '10px'}}
                  label="Follow up question text"
                  value={
                    audience === AUDIENCE.STAFF
                      ? question.followupQuestions[
                          question.followupQuestions.findIndex(
                            x => x.followupValue === i + 1
                          )
                        ]?.staffFollowupText
                      : audience === AUDIENCE.PARENT
                        ? question.followupQuestions[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ]?.parentFollowupText
                        : question.followupQuestions[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ]?.pupilFollowupText
                  }
                  onChange={e => {
                    let q = [...question.followupQuestions]
                    if (isPriority) {
                      if (audience === AUDIENCE.STAFF) {
                        if (
                          q[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ].pupilFollowupText ===
                          q[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ].staffFollowupText
                        )
                          q[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ].pupilFollowupText = e.target.value
                        if (
                          q[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ].parentFollowupText ===
                          q[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ].staffFollowupText
                        )
                          q[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ].parentFollowupText = e.target.value
                        q[
                          question.followupQuestions.findIndex(
                            x => x.followupValue === i + 1
                          )
                        ].staffFollowupText = e.target.value
                      }
                      if (audience === AUDIENCE.PARENT) {
                        if (
                          q[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ].pupilFollowupText ===
                          q[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ].parentFollowupText
                        )
                          q[
                            question.followupQuestions.findIndex(
                              x => x.followupValue === i + 1
                            )
                          ].pupilFollowupText = e.target.value
                        q[
                          question.followupQuestions.findIndex(
                            x => x.followupValue === i + 1
                          )
                        ].parentFollowupText = e.target.value
                      }
                      if (audience === AUDIENCE.STUDENT) {
                        q[
                          question.followupQuestions.findIndex(
                            x => x.followupValue === i + 1
                          )
                        ].pupilFollowupText = e.target.value
                      }
                    } else {
                      if (audience === AUDIENCE.STAFF)
                        q[
                          question.followupQuestions.findIndex(
                            x => x.followupValue === i + 1
                          )
                        ].staffFollowupText = e.target.value
                      if (audience === AUDIENCE.PARENT)
                        q[
                          question.followupQuestions.findIndex(
                            x => x.followupValue === i + 1
                          )
                        ].parentFollowupText = e.target.value
                      if (audience === AUDIENCE.STUDENT)
                        q[
                          question.followupQuestions.findIndex(
                            x => x.followupValue === i + 1
                          )
                        ].pupilFollowupText = e.target.value
                    }
                    updateQuestion({
                      ...question,
                      followupQuestions: [...q],
                      questionSettings: {...question.questionSettings},
                      multiOptionResponseAttributes: [
                        ...question.multiOptionResponseAttributes,
                      ],
                    })
                  }}
                ></WbTextField>
              )}
          </div>

          {i >= 2 ? (
            <IconButton
              onClick={e => {
                let qp = question.options
                qp.splice(i, 1)
                qp.map((o, idx) => (o.order = idx + 1))
                let q = question
                q.options = [...qp]
                updateQuestion(q)
              }}
              disabled={!isPriority}
            >
              <RemoveCircleOutline className="icon-delete" />
            </IconButton>
          ) : null}
        </Stack>
      </Grid>
    </Grid>
  )
}
