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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import React, {useEffect, useState} from 'react'
import {AUDIENCE} from '../../../../../utils/constants'
import WbTextField from '../../../../common/WbTextField'
import WbSwitch from '../../../../common/WbSwitch'
import {QUESTION_TYPE} from '../../../../../utils/constants'
import WbFileUpload from '../../../../common/WbFileUpload'

export default function MultipleOption({
  question,
  updateQuestion,
  audience,
  isPriority,
}) {
  const [pre, setPre] = useState(question.questionType === QUESTION_TYPE.LIKERT)
  const [preOptions, setPreOptions] = useState(
    '"Never, Rarely, Sometimes, Often, Always"'
  )

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
                updateQuestion({
                  ...question,
                  staffDescription: q.staffDescription,
                  pupilDescription: q.pupilDescription,
                  parentDescription: q.parentDescription,
                  followupQuestions: [...question.followupQuestions],
                  questionSettings: {...question.questionSettings},
                  multiOptionResponseAttributes: [
                    ...question.multiOptionResponseAttributes,
                  ],
                })
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

      <Grid container alignItems="center" my={2}>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <label>Answer Choices</label>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          {!pre && (
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
          )}
        </Grid>
        {question.questionType === QUESTION_TYPE.LIKERT && (
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12} mt={2} mb={1}>
              <FormControlLabel
                control={
                  <WbSwitch
                    size="small"
                    checked={pre}
                    onChange={e => setPre(e.target.checked)}
                    sx={{marginLeft: '5px'}}
                  />
                }
                label="Predefined likert answers"
              ></FormControlLabel>
            </Grid>
            {pre && (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <WbTextField
                  label={'Predefined options'}
                  select
                  value={preOptions}
                  onChange={e => {
                    setPreOptions(e.target.value)
                    let multiOptionResponseAttributes = []
                    e.target.value.split(',').map((option, i) => {
                      multiOptionResponseAttributes.push({
                        value: i + 1,
                        staffText: option,
                        pupilText: option,
                        parentText: option,
                        order: i + 1,
                      })
                    })
                    updateQuestion({
                      ...question,
                      multiOptionResponseAttributes: [
                        ...multiOptionResponseAttributes,
                      ],
                      followupQuestions: [...question.followupQuestions],
                      questionSettings: {...question.questionSettings},
                    })
                  }}
                >
                  <MenuItem value="Never, Rarely, Sometimes, Often, Always">
                    Never, Rarely, Sometimes, Often, Always
                  </MenuItem>

                  <MenuItem value="Worst, Bad, In the Middle, Good, Best">
                    Worst, Bad, In the Middle, Good, Best
                  </MenuItem>
                  <MenuItem value="Really Disagree, Disagree, In the Middle, Agree, Really Agree">
                    Really Disagree, Disagree, In the Middle, Agree, Really
                    Agree
                  </MenuItem>
                </WbTextField>
              </Grid>
            )}

            {pre && (
              <Grid item lg={12} md={12} sm={12} xs={12} pb={1}>
                <div className="followup-switch">
                  <FormControlLabel
                    control={
                      <WbSwitch
                        size="small"
                        disabled={!isPriority}
                        checked={question.hasFollowup}
                        onChange={e => {
                          updateQuestion({
                            ...question,
                            hasFollowup: e.target.checked,
                            followupQuestions: [...question.followupQuestions],
                            questionSettings: {...question.questionSettings},
                            multiOptionResponseAttributes: [
                              ...question.multiOptionResponseAttributes,
                            ],
                          })
                        }}
                      ></WbSwitch>
                    }
                    label="Ask follow up question"
                  ></FormControlLabel>
                </div>
              </Grid>
            )}
            {pre && question.hasFollowup && (
              <Grid container spacing={1}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <WbTextField
                    label="Follow up question text"
                    disabled={!isPriority}
                    value={
                      audience === AUDIENCE.STAFF
                        ? question.followupQuestions[0]?.staffFollowupText
                        : audience === AUDIENCE.PARENT
                          ? question.followupQuestions[0]?.parentFollowupText
                          : question.followupQuestions[0]?.pupilFollowupText
                    }
                    onChange={e => {
                      let q = [...question.followupQuestions]
                      if (q.length === 0) {
                        q.push({
                          followupValue: 1,
                          staffFollowupText: null,
                          pupilFollowupText: null,
                          parentFollowupText: null,
                        })
                      }

                      if (isPriority) {
                        if (audience === AUDIENCE.STAFF) {
                          if (q[0].pupilFollowupText === q[0].staffFollowupText)
                            q[0].pupilFollowupText = e.target.value
                          if (
                            q[0].parentFollowupText === q[0].staffFollowupText
                          )
                            q[0].parentFollowupText = e.target.value
                          q[0].staffFollowupText = e.target.value
                        }
                        if (audience === AUDIENCE.PARENT) {
                          if (
                            q[0].pupilFollowupText === q[0].parentFollowupText
                          )
                            q[0].pupilFollowupText = e.target.value
                          q[0].parentFollowupText = e.target.value
                        }
                        if (audience === AUDIENCE.STUDENT) {
                          q[0].pupilFollowupText = e.target.value
                        }
                      } else {
                        if (audience === AUDIENCE.STAFF)
                          q[0].staffFollowupText = e.target.value
                        if (audience === AUDIENCE.PARENT)
                          q[0].parentFollowupText = e.target.value
                        if (audience === AUDIENCE.STUDENT)
                          q[0].pupilFollowupText = e.target.value
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
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <WbTextField
                      label={'Value'}
                      select
                      disabled={!isPriority}
                      value={question.followupQuestions[0]?.followupValue}
                      onClick={e => {
                        let q = [...question.followupQuestions]
                        if (q.length === 0) {
                          q.push({
                            followupValue: 1,
                            staffFollowupText: null,
                            pupilFollowupText: null,
                            parentFollowupText: null,
                          })
                        }
                        q[0].followupValue = parseInt(e.target.dataset.value)

                        updateQuestion({
                          ...question,
                          followupQuestions: [...q],
                          questionSettings: {...question.questionSettings},
                          multiOptionResponseAttributes: [
                            ...question.multiOptionResponseAttributes,
                          ],
                        })
                      }}
                    >
                      {preOptions?.split(',').map((option, ii) => (
                        <MenuItem key={ii} value={ii + 1}>
                          {option}
                        </MenuItem>
                      ))}
                    </WbTextField>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
      {!pre &&
        question.multiOptionResponseAttributes
          ?.sort((x, y) => x.order - y.order)
          .map((option, e) =>
            OptionRow(question, updateQuestion, e, audience, isPriority)
          )}
      {!(
        question.questionType === QUESTION_TYPE.YES_NO_MAYBE ||
        question.questionType === QUESTION_TYPE.YES_NO
      ) &&
        !pre && (
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                variant="text"
                className="add-option"
                disableRipple
                onClick={e => {
                  let length = question.multiOptionResponseAttributes.length + 1
                  updateQuestion({
                    ...question,
                    multiOptionResponseAttributes: [
                      ...question.multiOptionResponseAttributes,
                      {
                        value: length,
                        staffText: 'Anwser ' + length,
                        pupilText: 'Anwser ' + length,
                        parentText: 'Anwser ' + length,
                        order: length,
                        numValue: length,
                      },
                    ],
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
            {/* <Grid item lg={12} md={12} sm={12} xs={12} mt={2} textAlign="right">
          <WbButton
            onClick={e => {
              // if (question.id > 0) {
              //   surveyQuestionApi
              //     .put(question)
              //     .then(res => {
              //       updateQuestion(res)
              //       WbAlert({
              //         message: 'Question saved successfully',
              //         type: 'success',
              //       })
              //     })
              //     .catch()
              //     .finally()
              // } else {
              //   surveyQuestionApi
              //     .post(question)
              //     .then(res => {
              //       updateQuestion(res)
              //       WbAlert({
              //         message: 'Question saved successfully',
              //         type: 'success',
              //       })
              //     })
              //     .catch()
              //     .finally()
              // }
            }}
            CustomButtonText={'Save'}
          ></WbButton>
        </Grid> */}
          </Grid>
        )}
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
                        q.multiOptionResponseAttributes[i].pupilText =
                          e.target.value
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
                      if (e.target.checked) {
                        let q = [...question.followupQuestions]
                        q.push({
                          followupValue: i + 1,
                          staffFollowupText: null,
                          pupilFollowupText: null,
                          parentFollowupText: null,
                        })
                        updateQuestion({
                          ...question,
                          hasFollowup: true,
                          followupQuestions: [...q],
                          questionSettings: {...question.questionSettings},
                          multiOptionResponseAttributes: [
                            ...question.multiOptionResponseAttributes,
                          ],
                        })
                      } else {
                        let q = [...question.followupQuestions]
                        q = q.filter(f => f.followupValue !== i + 1)
                        updateQuestion({
                          ...question,
                          hasFollowup: q.length > 0 ? true : false,
                          followupQuestions: [...q],
                          questionSettings: {...question.questionSettings},
                          multiOptionResponseAttributes: [
                            ...question.multiOptionResponseAttributes,
                          ],
                        })
                      }
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
                        q[i].staffFollowupText = e.target.value
                      if (audience === AUDIENCE.PARENT)
                        q[i].parentFollowupText = e.target.value
                      if (audience === AUDIENCE.STUDENT)
                        q[i].pupilFollowupText = e.target.value
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

          {i >= 2 && question.questionType !== QUESTION_TYPE.YES_NO_MAYBE ? (
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
