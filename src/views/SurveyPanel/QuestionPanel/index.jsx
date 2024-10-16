import React, {useEffect, useState} from 'react'
import QuestionToolbar from '../../../components/screens/surveyForms/questions/QuestionToolbar'
import QuestionCanvas from '../../../components/screens/surveyForms/questions/QuestionCanvas'
import QuestionPreview from '../../../components/screens/surveyForms/questions/QuestionPreview'
import SurveySettings from './SurveySettings'
import QuestionLibrary from './QuestionLibrary'
import QuestionsList from './QuestionsList'
import AddedQuestions from './AddedQuestions'
import {useParams} from 'react-router-dom'
import surveyQuestionApi from '../../../services/api/surveys/surveyQuestionApi'
import {Backdrop} from '@mui/material'
import {surveysApi} from '../../../services'
import {set} from 'lodash'
import {AUDIENCE} from '../../../utils/constants'

export default function QuestionPanel() {
  const {token} = useParams()

  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('main')
  const [index, setIndex] = useState(null)
  const [survey, setSurvey] = useState(null)
  const [questions, setQuestions] = useState([])

  const handleAddNewQuestion = val => {
    setIndex(questions?.length)
    val.audiences = survey.audience
    //val.order = questions?.length
    console.log('added / updated question', val)
    setQuestions([
      ...questions,
      {
        ...val,
        questionSettings: {...val.questionSettings},
        sliderResponseAttributes: {...val.sliderResponseAttributes},
        multiOptionResponseAttributes: val?.multiOptionResponseAttributes
          ? [...val.multiOptionResponseAttributes]
          : null,
        followupQuestions: val.followupQuestions
          ? [...val.followupQuestions]
          : null,
        openResponseAttributes: {...val.openResponseAttributes},
      },
    ])
  }
  useEffect(() => {
    surveysApi.get(token).then(res => {
      setSurvey({...res})
    })
    surveyQuestionApi
      .getByToken(token)
      .then(res => {
        let qs = []
        if (res && res.length > 0) {
          qs = [
            ...res.map(q => {
              return {
                ...q,
                questionSettings: {...q.questionSettings},
                sliderResponseAttributes: {...q.sliderResponseAttributes},
                multiOptionResponseAttributes: [
                  ...q.multiOptionResponseAttributes,
                ],
                followupQuestions: [...q.followupQuestions],
                openResponseAttributes: {...q.openResponseAttributes},
              }
            }),
          ]
        }
        setQuestions(qs)
      })
      .catch(err => console.log(err))
  }, [])
  const getAudience = audience => {
    switch (audience) {
      case AUDIENCE.STAFF + AUDIENCE.PARENT:
        return [AUDIENCE.STAFF, AUDIENCE.PARENT]
      case AUDIENCE.STAFF + AUDIENCE.STUDENT:
        return [AUDIENCE.STAFF, AUDIENCE.STUDENT]
      case AUDIENCE.PARENT + AUDIENCE.STUDENT:
        return [AUDIENCE.PARENT, AUDIENCE.STUDENT]
      case AUDIENCE.STAFF + AUDIENCE.PARENT + AUDIENCE.STUDENT:
        return [AUDIENCE.STAFF, AUDIENCE.PARENT, AUDIENCE.STUDENT]
      default:
        return [audience]
    }
  }
  return loading ? (
    <Backdrop open={loading}>
      <h1>Loading...</h1>
    </Backdrop>
  ) : (
    <div className="question-panels">
      <QuestionToolbar view={view} setView={setView}></QuestionToolbar>
      <QuestionCanvas>
        {view === 'library' ? (
          <QuestionLibrary
            survey={survey}
            questions={questions}
            setQuestions={setQuestions}
          ></QuestionLibrary>
        ) : view === 'settings' ? (
          <SurveySettings
            survey={survey}
            setSurvey={setSurvey}
          ></SurveySettings>
        ) : (
          <>
            <QuestionsList
              survey={survey}
              questions={questions}
              onQuestionChange={questions => setQuestions([...questions])}
              index={index}
              setIndex={setIndex}
              priorityAudience={
                survey?.audience ? getAudience(survey?.audience) : [1]
              }
              setSurvey={setSurvey}
            ></QuestionsList>
            <AddedQuestions onChange={handleAddNewQuestion}></AddedQuestions>
          </>
        )}
      </QuestionCanvas>
      <QuestionPreview
        tabs={survey?.audience ? getAudience(survey?.audience) : [1]}
        hasQuestion={questions?.length > 0}
        question={
          questions
            ? {
                ...questions[index],
              }
            : null
        }
      ></QuestionPreview>
    </div>
  )
}
