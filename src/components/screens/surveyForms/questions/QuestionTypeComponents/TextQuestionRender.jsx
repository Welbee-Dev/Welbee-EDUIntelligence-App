import React, {useEffect, useState} from 'react'
import {AUDIENCE} from '../../../../../utils/constants'
import {Grid} from '@mui/material'
import WbTextField from '../../../../common/WbTextField'
import questionResponseTemplate from '../../../../../utils/questionResponseTemplate'

export default function TextQuestionRender({
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
    questionTypeText: 'Open Response',
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
        <WbTextField
          label={'Enter your response here'}
          multiline
          rows={4}
          value={response.comment}
          onChange={e => {
            if (
              question.openResponseAttributes.hasCharacterLimit &&
              e.target.value.length >
                question.openResponseAttributes.maxCharacterLimit
            ) {
              return
            }
            setResponse({...response, comment: e.target.value})
            if (updateAnswers) {
              updateAnswers({...response, comment: e.target.value})
            }
          }}
        />
      </Grid>
    </Grid>
  )
}
