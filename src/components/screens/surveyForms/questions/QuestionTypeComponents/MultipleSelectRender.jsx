import React, {useEffect, useState} from 'react'
import {AUDIENCE, QUESTION_TYPE} from '../../../../../utils/constants'
import {FormControlLabel, Stack, Grid} from '@mui/material'
import WbTextField from '../../../../common/WbTextField'
import WbCheckbox from '../../../../common/WbCheckbox'
import questionResponseTemplate from '../../../../../utils/questionResponseTemplate'
import {Config} from '../../../../../utils/Config'

export default function MultipleSelectRender({
  question,
  audience,
  updateAnswers,
}) {
  const [value, setValue] = useState([])

  const [followupComment, setFollowupComment] = useState(null)
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
    questionTypeText: 'Multiple Select',
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
          {question?.multiOptionResponseAttributes?.map((option, index) => (
            <FormControlLabel
              style={{padding: 5, backgroundColor: 'rgba(0,0,0,0.10)'}}
              control={
                <WbCheckbox
                  checked={value.findIndex(x => x.value === option.value) > -1}
                  value={option}
                  onChange={event => {
                    if (event.target.checked) {
                      setValue([...value, {...option}])

                      let resp = {
                        ...response,

                        [`value${index + 1}`]: option.value,
                        [`valueText${index + 1}`]:
                          audience === AUDIENCE.STAFF
                            ? option.staffText
                            : AUDIENCE.PARENT == audience
                              ? option.parentText
                              : option.pupilText,
                        [`numValue${index + 1}`]: question.hasCustomValue
                          ? option.numValue
                          : null,
                      }
                      setResponse({...resp})
                      if (updateAnswers) {
                        updateAnswers({...resp})
                      }
                    } else {
                      setValue([...value.filter(x => x.value !== option.value)])

                      let resp = {
                        ...response,
                        followupComment:
                          value.findIndex(x => x.value === option.value) > -1
                            ? null
                            : response.followupComment,
                        [`value${index + 1}`]: null,
                        [`numValue${index + 1}`]: null,
                        [`numValue${index + 1}Text`]: null,
                      }
                      setResponse({...resp})
                      if (updateAnswers) {
                        updateAnswers({...resp})
                      }
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
        </Stack>

        {question.hasFollowup &&
          value.findIndex(
            x => x.value === question.followupQuestions[0]?.followupValue
          ) > -1 && (
            <Stack direction="column" spacing={2} mt={1}>
              <Stack>
                <h2>
                  {AUDIENCE.STAFF === audience
                    ? question.followupQuestions[
                        question.followupQuestions.findIndex(
                          x =>
                            value?.findIndex(
                              y => y?.value === x.followupValue
                            ) > -1
                        )
                      ]?.staffFollowupText
                    : AUDIENCE.PARENT == audience
                      ? question.followupQuestions[
                          question.followupQuestions.findIndex(
                            x =>
                              value?.findIndex(
                                y => y?.value === x.followupValue
                              ) > -1
                          )
                        ]?.parentFollowupText
                      : question.followupQuestions[
                          question.followupQuestions.findIndex(
                            x =>
                              value?.findIndex(
                                y => y?.value === x.followupValue
                              ) > -1
                          )
                        ]?.pupilFollowupText}
                </h2>
              </Stack>

              <Stack>
                <WbTextField
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
