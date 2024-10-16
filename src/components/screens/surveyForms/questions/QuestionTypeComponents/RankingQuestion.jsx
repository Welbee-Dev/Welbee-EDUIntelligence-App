import {DragIndicator, RemoveCircleOutline} from '@mui/icons-material'
import {Grid, Button, IconButton, Link, Stack} from '@mui/material'
import React, {useState} from 'react'
import {AUDIENCE} from '../../../../../utils/constants'
import WbTextField from '../../../../common/WbTextField'

export default function RankingQuestion({
  question,
  updateQuestion,
  audience,
  isPriority,
}) {
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
          ></WbTextField>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} my={2} textAlign="right">
          <div className="meta-text">
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
          </div>
        </Grid>
        {question.hasDescription && (
          <Grid container alignItems="center" mb={3}>
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
      </Grid>

      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} mb={1}>
          <label>Answer Choices</label>
        </Grid>

        {question.multiOptionResponseAttributes.map((option, e) =>
          OptionRow(question, updateQuestion, e, audience, isPriority)
        )}

        <Grid item lg={12} md={12} sm={12} xs={12} mt={1}>
          <Button
            variant="text"
            className="add-option"
            disableRipple
            disableElevation
            onClick={e => {
              let q = [...question.multiOptionResponseAttributes]
              q.push({
                ...question.multiOptionResponseAttributes[0],
              })
              q[q.length - 1].staffText = 'Answer ' + q.length
              q[q.length - 1].pupilText = 'Answer ' + q.length
              q[q.length - 1].parentText = 'Answer ' + q.length
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
      mt={1}
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
          multiOptionResponseAttributes: [...options],
          followupQuestions: [...question.followupQuestions],
          questionSettings: {...question.questionSettings},
        })
      }}
    >
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Stack direction="row" alignItems="start">
          <IconButton disabled={!isPriority} style={{cursor: 'grab'}}>
            <DragIndicator //</Grid>onPointerDown={e => controls.start(e)}
            ></DragIndicator>
          </IconButton>

          <WbTextField
            sx={{width: '86%'}}
            label={'Answer ' + (i + 1)}
            value={
              audience === AUDIENCE.STAFF
                ? question.multiOptionResponseAttributes[i].staffText
                : audience === AUDIENCE.PARENT
                  ? question.multiOptionResponseAttributes[i].parentText
                  : question.multiOptionResponseAttributes[i].pupilText
            }
            onChange={e => {
              let q = [...question.multiOptionResponseAttributes]
              if (isPriority) {
                if (audience === AUDIENCE.STAFF) {
                  if (q[i].pupilText === q[i].staffText)
                    q[i].pupilText = e.target.value
                  if (q[i].parentText === q[i].staffText)
                    q[i].parentText = e.target.value
                  q[i].staffText = e.target.value
                }
                if (audience === AUDIENCE.PARENT) {
                  if (q[i].pupilText === q[i].parentText)
                    q[i].pupilText = e.target.value
                  q[i].parentText = e.target.value
                }
                if (audience === AUDIENCE.STUDENT) {
                  q[i].pupilText = e.target.value
                }
              } else {
                if (audience === AUDIENCE.STAFF) q[i].staffText = e.target.value
                if (audience === AUDIENCE.PARENT)
                  q[i].parentText = e.target.value
                if (audience === AUDIENCE.STUDENT)
                  q[i].pupilText = e.target.value
              }

              updateQuestion({
                ...question,
                multiOptionResponseAttributes: [...q],
                followupQuestions: [...question.followupQuestions],
                questionSettings: {...question.questionSettings},
              })
            }}
          />

          {i >= 0 ? (
            <IconButton
              onClick={e => {
                let qp = [...question.multiOptionResponseAttributes]
                qp.splice(i, 1)
                qp.map((o, idx) => (o.order = idx + 1))
                let q = question
                updateQuestion({
                  ...q,
                  multiOptionResponseAttributes: [...qp],
                  followupQuestions: [...q.followupQuestions],
                  questionSettings: {...q.questionSettings},
                })
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
