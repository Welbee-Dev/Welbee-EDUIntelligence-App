import React, {useState} from 'react'
import {AUDIENCE} from '../../../../../utils/constants'
import {Stack, Grid} from '@mui/material'
import WbSlider from '../../../../common/WbSlider'
import WbTextField from '../../../../common/WbTextField'
import questionResponseTemplate from '../../../../../utils/questionResponseTemplate'

export default function NumberSliderRender({
  question,
  audience,
  updateAnswers,
}) {
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
    questionTypeText: 'Number Slider',
  })

  const marks = [
    {
      value: question.sliderResponseAttributes.rangeTo,
      label:
        AUDIENCE.STAFF === audience
          ? question.sliderResponseAttributes.staffHighScaleLabel
          : AUDIENCE.PARENT == audience
            ? question.sliderResponseAttributes.parentHighScaleLabel
            : question.sliderResponseAttributes.pupilHighScaleLabel,
    },
    {
      value:
        (question.sliderResponseAttributes.rangeFrom +
          question.sliderResponseAttributes.rangeTo) /
        2,
      label:
        AUDIENCE.STAFF === audience
          ? question.sliderResponseAttributes.staffMidScaleLabel
          : AUDIENCE.PARENT == audience
            ? question.sliderResponseAttributes.parentMidScaleLabel
            : question.sliderResponseAttributes.pupilMidScaleLabel,
    },
    {
      value: question.sliderResponseAttributes.rangeFrom,
      label:
        AUDIENCE.STAFF === audience
          ? question.sliderResponseAttributes.staffLowScaleLabel
          : AUDIENCE.PARENT == audience
            ? question.sliderResponseAttributes.parentLowScaleLabel
            : question.sliderResponseAttributes.pupilLowScaleLabel,
    },
  ]

  const shouldRenderFollowup = () => {
    if (question.hasFollowup) {
      switch (question.followupQuestions[0].followupValueOperator) {
        case 1:
          return question.followupQuestions[0].followupValue < response.value1
        case 2:
          return question.followupQuestions[0].followupValue > response.value1
        case 3:
          return question.followupQuestions[0].followupValue == response.value1
        case 4:
          return question.followupQuestions[0].followupValue >= response.value1
        case 5:
          return question.followupQuestions[0].followupValue <= response.value1
      }
    }
    return false
  }
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
      <Grid item lg={12} md={12} sm={12} xs={12} mt={2}>
        <WbSlider
          step={1}
          min={question.sliderResponseAttributes.rangeFrom}
          max={question.sliderResponseAttributes.rangeTo}
          marks={marks}
          value={response.value1}
          onChange={(e, v) => {
            let resp = {
              ...response,
              value1: v,
            }
            setResponse({...resp})
            if (updateAnswers) {
              updateAnswers({...resp})
            }
          }}
        ></WbSlider>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Stack direction="column" mt={5} rowGap={1} alignItems="start">
          {shouldRenderFollowup()
            ? AUDIENCE.STAFF === audience
              ? question.followupQuestions[0].staffFollowupText
              : AUDIENCE.PARENT == audience
                ? question.followupQuestions[0].parentFollowupText
                : question.followupQuestions[0].pupilFollowupText
            : ''}

          {shouldRenderFollowup() ? (
            <WbTextField
              multiline
              fullWidth
              label="Add follow up answer"
              value={response.followupComment}
              onChange={e => {
                let resp = {
                  ...response,
                  followupComment: e.target.value,
                }
                setResponse({...resp})

                if (updateAnswers) {
                  updateAnswers({...resp})
                }
              }}
            ></WbTextField>
          ) : null}
        </Stack>
      </Grid>
    </Grid>
  )
}
