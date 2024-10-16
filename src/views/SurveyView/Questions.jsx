import React, {useState} from 'react'
import {QUESTION_TYPE} from '../../utils/constants'
import PercentageQuestionRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/PercentageQuestionRender'
import NumberSliderRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/NumberSliderRender'
import RankingQuestionRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/RankingQuestionRander'
import TextQuestionRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/TextQuestionRender'
import MultipleOptionRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/MultipleOptionRender'
import WbButton from '../../components/common/WbButton'
import WbOutlineButton from '../../components/common/WbOutlineButton'
import MultipleSelectRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/MultipleSelectRender'
import WbAlert from '../../components/common/WbAlert'
import surveysApi from '../../services/api/surveys/surveysApi'
import {Grid, Stack} from '@mui/material'
import {useParams} from 'react-router-dom'
import {styled} from '@mui/material/styles'
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import YesNoMayRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/YesNoMayRender'

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#007A7A',
    ...theme.applyStyles('dark', {
      backgroundColor: '#007A7A',
    }),
  },
}))

export default function Questions({tab, questions, setSurveyEnd}) {
  const {token} = useParams()
  const [sel, setSel] = useState(0)
  const [responses, setResponses] = useState([])

  const updateAnswers = value => {
    let resp = responses
    let idx = resp.findIndex(r => r.questionId === value.questionId)
    if (idx === -1) {
      resp.push(value)
    } else {
      resp[idx] = value
    }
    setResponses(resp)
  }

  const submitResponses = () => {
    //let dto = []
    // responses.forEach(r => {
    //   let numValue = []
    //   let value = []
    //   for (let i = 1; i <= 10; i++) {
    //     if (r[`value${i}`] !== null) {
    //       value.push(r[`value${i}`])
    //     }
    //   }
    //   for (let i = 1; i <= 10; i++) {
    //     if (r[`numValue${i}`] !== null) {
    //       numValue.push(r[`numValue${i}`])
    //     }
    //   }
    //   dto.push({
    //     questionId: r.questionId,
    //     value: value,
    //     numValue: numValue,
    //     followupComment: r.followupComment,
    //     comment: r.comment,
    //   })
    // })
    surveysApi
      .submit({participantToken: token, answers: responses, audience: tab})
      .then(() => {})
      .catch(err =>
        WbAlert({message: 'Error submitting response' + err, type: 'error'})
      )
    setSurveyEnd(true)
  }

  const gotoNextQuestion = () => {
    responses.findIndex(x => x.questionId === questions[sel].id) > -1
      ? setSel(sel + 1)
      : WbAlert({message: 'Please answer the question', type: 'error'})
  }

  const getPreview = (templateQuestion, i) => {
    const question = {
      ...templateQuestion,
      questionSettings: {...templateQuestion.questionSettings},
      followupQuestions:
        templateQuestion.followupQuestions?.length > 0
          ? [...templateQuestion.followupQuestions]
          : null,
      multiOptionResponseAttributes:
        templateQuestion.multiOptionResponseAttributes?.length > 0
          ? [...templateQuestion.multiOptionResponseAttributes]
          : null,
      sliderResponseAttributes: {...templateQuestion.sliderResponseAttributes},
      openResponseAttributes: {...templateQuestion.openResponseAttributes},
    }
    switch (question.questionType) {
      case QUESTION_TYPE.MULTIPLE_SELECT:
        return (
          <MultipleSelectRender
            question={{...question}}
            audience={tab}
            updateAnswers={updateAnswers}
          />
        )

      case QUESTION_TYPE.YES_NO:
      case QUESTION_TYPE.YES_NO_MAYBE:
        ;<YesNoMayRender
          question={{...question}}
          audience={tab}
          updateAnswers={updateAnswers}
        />
      case QUESTION_TYPE.LIKERT:
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleOptionRender
            question={{...question}}
            audience={tab}
            updateAnswers={updateAnswers}
          />
        )
      case QUESTION_TYPE.COMMENTS:
        return (
          <TextQuestionRender
            question={{...question}}
            audience={tab}
            updateAnswers={updateAnswers}
          />
        )
      case QUESTION_TYPE.RANKING:
        return (
          <RankingQuestionRender
            question={{...question}}
            audience={tab}
            updateAnswers={updateAnswers}
          />
        )
      case QUESTION_TYPE.NUMBER_SLIDER:
        return (
          <NumberSliderRender
            question={{...question}}
            audience={tab}
            updateAnswers={updateAnswers}
          />
        )
      case QUESTION_TYPE.PERCENTAGE:
        return (
          <PercentageQuestionRender
            question={{...question}}
            audience={tab}
            updateAnswers={updateAnswers}
          />
        )
      default:
        return <div>Question type not available {question.questionType}</div>
    }
  }

  return (
    <div className="survey-preview">
      <div className="question-preview grow">
        <Grid container justifyContent="center" textAlign="center">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="preview">
              {questions?.map((q, i) => (
                <div
                  className="question-slider"
                  style={{
                    transition: 'all 0.5s',
                    visibility: i === sel ? 'visible' : 'hidden',
                    opacity: i === sel ? 1 : 0,
                    transform:
                      i < sel
                        ? `translateX(${i === sel ? 0 : -100}%)`
                        : `translateX(${i === sel ? 0 : 100}%)`,
                  }}
                >
                  <div className="question-box">{getPreview(q, i)}</div>
                </div>
              ))}
            </div>
            <div className="bottom-nav">
              <div className="question-nav">
                <Grid container>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Stack direction="row" justifyContent="space-between">
                      <div>
                        {sel === 0 ? (
                          ''
                        ) : (
                          <WbOutlineButton
                            onClick={() => setSel(sel - 1)}
                            CustomOutlineButtonText={'Previous'}
                          />
                        )}
                      </div>
                      <div>
                        {sel >= questions?.length - 1 ? (
                          <WbButton
                            onClick={submitResponses}
                            CustomButtonText={'Submit'}
                          />
                        ) : (
                          <WbButton
                            onClick={gotoNextQuestion}
                            CustomButtonText={'Next'}
                          />
                        )}
                      </div>
                    </Stack>
                  </Grid>
                </Grid>
              </div>
              <BorderLinearProgress
                variant="determinate"
                value={(sel * 100) / questions?.length}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
