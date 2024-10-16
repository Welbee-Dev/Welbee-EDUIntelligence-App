import React, {useState} from 'react'
import {AUDIENCE} from '../../../../../utils/constants'
import {FormControlLabel, Stack, Grid} from '@mui/material'
import WbTextField from '../../../../common/WbTextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import questionResponseTemplate from '../../../../../utils/questionResponseTemplate'
import {Config} from '../../../../../utils/Config'
import WbRadioButton from '../../../../common/WbRadioButton'

export default function YesNoMayRender({question, audience, updateAnswers}) {
  const [value, setValue] = useState(null)
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
    questionTypeText: question.questionType === 4 ? 'Yes/No' : 'Yes/No/May',
  })

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

      {question.image && (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <img
            src={`${Config.BASE_URL}/Artifact/download?fileName=${question.image}`}
            alt="question image"
            style={{width: 150, height: 'auto'}}
          />
        </Grid>
      )}
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
        <Stack direction="column" spacing={1}>
          <div className="radio-button-container">
            <RadioGroup value={value?.value}>
              {question?.multiOptionResponseAttributes
                ?.sort((x, y) => x.order - y.order)
                .map((option, index) => (
                  <FormControlLabel
                    style={{
                      margin: '5px 0',
                      backgroundColor: 'rgba(0,0,0,0.10)',
                    }}
                    control={
                      <WbRadioButton
                        checked={response[`value${index + 1}`] !== null}
                        onChange={e => {
                          setValue(option)
                          let resp = {
                            ...response,
                            followupComment:
                              question.hasFollowup &&
                              question.followupQuestions.findIndex(
                                x => x.followupValue == value?.value
                              ) > -1
                                ? response.followupComment
                                : null,
                          }

                          question?.multiOptionResponseAttributes.map(
                            (op, i) => {
                              if (op.value === option.value) {
                                resp[`valueText${index + 1}`] =
                                  audience === AUDIENCE.STAFF
                                    ? option.staffText
                                    : AUDIENCE.PARENT == audience
                                      ? option.parentText
                                      : option.pupilText
                                resp[`value${i + 1}`] = option.value
                                resp[`numValue${i + 1}`] =
                                  question.hasCustomValue && option.numValue
                                    ? option.numValue
                                    : null
                              } else {
                                resp[`value${i + 1}`] = null
                                resp[`numValue${i + 1}`] = null
                                resp[`valueText${index + 1}`] = null
                              }
                            }
                          )
                          setResponse(resp)
                          if (updateAnswers) {
                            updateAnswers(resp)
                          }
                        }}
                      />
                    }
                    label={
                      AUDIENCE.STAFF === audience
                        ? option.staffText
                        : AUDIENCE.PARENT == audience
                          ? option.parentText
                          : option.pupilText
                    }
                  />
                ))}
            </RadioGroup>
          </div>
        </Stack>
        {question.hasFollowup &&
          question.followupQuestions.findIndex(
            x => x.followupValue === value?.value
          ) > -1 && (
            <Stack direction="column" spacing={2} mt={1}>
              <Stack>
                <h2>
                  {AUDIENCE.STAFF === audience
                    ? question.followupQuestions[
                        question.followupQuestions.findIndex(
                          x => x.followupValue === value?.value
                        )
                      ]?.staffFollowupText
                    : AUDIENCE.PARENT === audience
                      ? question.followupQuestions[
                          question.followupQuestions.findIndex(
                            x => x.followupValue === value?.value
                          )
                        ]?.parentFollowupText
                      : question.followupQuestions[
                          question.followupQuestions.findIndex(
                            x => x.followupValue === value?.value
                          )
                        ]?.pupilFollowupText}
                </h2>
              </Stack>

              <Stack>
                <WbTextField
                  multiline
                  rows={4}
                  label={'Enter your comment'}
                  value={response.followupComment}
                  onChange={e => {
                    setResponse({
                      ...response,
                      followupComment: e.target.value,
                    })

                    if (updateAnswers) {
                      updateAnswers({
                        ...response,
                        followupComment: e.target.value,
                      })
                    }
                  }}
                ></WbTextField>
              </Stack>
            </Stack>
          )}
      </Grid>
    </Grid>
  )
}
