import React from 'react'
import {useRoutes} from 'react-router-dom'
import Base from '../components/layouts/Base'
import paths from './paths'
import Dashboard from '../views/Dashboard'
import NotFound from '../views/NotFound'
import SurveyPanel from '../components/layouts/SurveyPanel/index.jsx'
import QuestionPanel from '../views/SurveyPanel/QuestionPanel/index.jsx'
//import SurveyTemplatesPanel from '../components/layouts/SurveyTemplatesPanel/index.jsx'
import SurveyTemplates from '../views/SurveyTemplates/index.jsx'
//import SurveyTemplatePreview from '../views/SurveyTemplates/SurveyTemplatePreview.jsx'
import InvitesPanel from '../views/SurveyPanel/InvitesPanel/index.jsx'
import SchedulePanel from '../views/SurveyPanel/SchedulePanel/index.js'
import SurveyView from '../views/SurveyView'
import SurveyParticipants from '../views/SurveyPanel/SurveyParticipants/index.jsx'
import ResultsLayout from '../components/layouts/ResultsLayout/index.jsx'
import Comments from '../views/ResultsPanel/Comments/index.jsx'
import Login from '../views/Account/Login.jsx'
import ParticipantReply from '../views/ResultsPanel/Comments/ParticipantReply.jsx'
import Questions from '../views/SuperAdmin/Questions/index.jsx'
import QuestionTags from '../views/SuperAdmin/Questions/QuestionTags.jsx'
import Redirect from '../views/SuperAdmin/Redirect.jsx'

export default function AppRoutes() {
  const AuthenticatedRoutes = route => {
    var token = localStorage.getItem('token')
    const isAuthenticated = token ? true : false
    if (isAuthenticated) {
      return route
    }
    return <Login />
  }

  const elements = useRoutes([
    {
      path: '/',
      element: <Base />,

      children: [
        {
          path: paths.dashboard,
          element: AuthenticatedRoutes(<Dashboard />),
        },
        {
          path: paths.surveyTemplatesPanel,
          element: AuthenticatedRoutes(<SurveyTemplates></SurveyTemplates>),
        },

        {
          path: paths.dashboard,
          element: <SurveyPanel />,
          children: [
            {
              path: paths.questionPanel,
              element: AuthenticatedRoutes(<QuestionPanel />),
            },
            {
              path: paths.surveyParticipants,
              element: AuthenticatedRoutes(<SurveyParticipants />),
            },
            {
              path: paths.invitesPanel,
              element: AuthenticatedRoutes(<InvitesPanel />),
            },
            {
              path: paths.schedulePanel,
              element: AuthenticatedRoutes(<SchedulePanel />),
            },
          ],
        },

        {path: paths.question, element: <Questions />},
        {path: paths.questiontag, element: <QuestionTags />},

        // {path: paths.subcategories, element: <SubCategories />},
        // {path: paths.question, element: <QuestionForm />},
        {
          path: paths.resultsDash,
          element: <ResultsLayout />,
          children: [
            {path: paths.comments, element: AuthenticatedRoutes(<Comments />)},
          ],
        },
      ],
    },
    {path: paths.login, element: <Login />},
    {path: paths.surveyView, element: <SurveyView />},
    {path: paths.participantsReply, element: <ParticipantReply />},
    {path: paths.superAdminRedirect, element: <Redirect />},

    {path: '*', element: <NotFound />},
  ])
  return elements
}
