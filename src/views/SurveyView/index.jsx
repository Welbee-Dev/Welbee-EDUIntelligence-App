import React, {useEffect} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import questionsApi from '../../services/api/questionLibrary/questionsApi'
import SubmissionBlocker from './submissionBlocker'
import WelcomeScreen from './WelcomeScreen'
import Questions from './Questions'
import {CircularProgress} from '@mui/material'

export default function SurveyView() {
  const {aud, token} = useParams()
  const [surveyStart, setSurveyStart] = React.useState(false)
  const [surveyEnd, setSurveyEnd] = React.useState(false)
  const [surveyData, setSurveyData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    questionsApi
      .getQuestionForParticipants(token)
      .then(res => setSurveyData(res))
      .finally(() => setLoading(false))
  }, [])

  return loading ? (
    <div className="welcome">
      <CircularProgress color="inherit" />
    </div>
  ) : surveyData?.isSurveyClosed ? (
    <SubmissionBlocker type="closed" />
  ) : surveyData?.isSubmitted ? (
    <SubmissionBlocker />
  ) : !surveyStart ? (
    <WelcomeScreen setSurveyStart={setSurveyStart} />
  ) : surveyEnd ? (
    <SubmissionBlocker type="end" />
  ) : (
    <Questions
      questions={surveyData?.questions}
      tab={parseInt(aud)}
      setSurveyEnd={setSurveyEnd}
    />
  )
}
