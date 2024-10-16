import React, {useState} from 'react'
import SurveyType from '../../components/screens/surveyForms/SurveyType'
import SurveyDetails from '../../components/screens/surveyForms/SurveyDetails'
import WbModal from '../../components/common/WbModal'
import SurveyTemplates from '../SurveyTemplates'
import {surveysApi} from '../../services'
import {Dialog, DialogContent, Stack} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import paths from '../../routes/paths'

export default function ({onClose}) {
  const navigate = useNavigate()

  const [loadTemplates, setLoadtemplates] = useState(false)
  const [survey, setSurvey] = useState(null)
  const [screen, setScreen] = useState(1)

  const handleCreateOrLoadTemplates = type => {
    if (type === 'scratch') {
      surveysApi
        .post(survey)
        .then(response =>
          navigate(
            paths.questionPanel.replace(
              ':token',
              encodeURIComponent(response.token)
            ),
            {state: {survey: response}}
          )
        )
        .catch(error => {})
        .finally(() => {})
    } else {
      //setLoadtemplates(true)
      navigate(
        paths.surveyTemplatesPanel
          .replace(':audience', survey.audience)
          .replace(':anonimous', survey.anonymous)
          .replace(':shared', survey.sharedResults)
      )
    }
  }
  return (
    <WbModal
      onClose={onClose}
      title={'Create new survey'}
      subtitle={
        'Select the audience for this survey. You can select more than one.'
      }
      content={
        <Stack>
          {screen === 1 ? (
            <SurveyDetails
              onComplete={s => {
                setSurvey(s)
                setScreen(2)
              }}
              onCancel={onClose}
              survey={survey}
            ></SurveyDetails>
          ) : (
            <SurveyType
              onTemplateSelect={handleCreateOrLoadTemplates}
              onCancel={onClose}
              onPrevious={() => setScreen(1)}
            ></SurveyType>
          )}
        </Stack>
      }
    />
  )
}
