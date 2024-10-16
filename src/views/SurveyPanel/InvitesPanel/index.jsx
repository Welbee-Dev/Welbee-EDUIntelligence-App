import React, {useEffect, useState} from 'react'
import {surveysApi} from '../../../services'
import {useNavigate, useParams} from 'react-router-dom'
import {
  Backdrop,
  CircularProgress,
  Grid,
  Tabs,
  Container,
  Stack,
} from '@mui/material'
import WbTab from '../../../components/common/WbTab'
import {AUDIENCE_SELECT} from '../../../utils/constants'
import Invite from './Invite'
import paths from '../../../routes/paths'
import WbOutlineButton from '../../../components/common/WbOutlineButton'
import WbButton from '../../../components/common/WbButton'
import PublishButton from '../../../components/screens/surveyForms/PublishButton'

export default function InvitesPanel() {
  const navigate = useNavigate()
  const {token} = useParams()
  const [survey, setSurvey] = useState(null)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(1)

  useEffect(() => {
    setLoading(true)
    surveysApi
      .get(token)
      .then(res => {
        setSurvey(res)
        setValue(
          res.audience <= 3
            ? 1
            : res.audience === 4
              ? 4
              : res.audience === 5
                ? 1
                : res.audience === 6
                  ? 2
                  : 1
        )
      })
      .finally(() => setLoading(false))
  }, [])

  const getTabs = a => {
    if (a === 1) return ['Staff']
    if (a === 2) return ['Parent']
    if (a === 3) return ['Staff', 'Parent']
    if (a === 4) return ['Student']
    if (a === 5) return ['Staff', 'Student']
    if (a === 6) return ['Parent', 'Student']
    if (a === 7) return ['Staff', 'Parent', 'Student']
  }

  return loading ? (
    <Backdrop open={loading}>
      <CircularProgress />
    </Backdrop>
  ) : (
    <Container maxWidth="lg">
      <div className="body-container">
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <h1>Invites</h1>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} mt={2}>
            <Tabs
              value={value}
              onChange={(e, v) => setValue(v)}
              className="custom-tabs invite"
            >
              {survey &&
                AUDIENCE_SELECT.filter(a =>
                  getTabs(survey.audience).includes(a.label)
                ).map((audience, index) => (
                  <WbTab
                    value={audience.value}
                    label={audience.label}
                    onClick={e => setValue(audience.value)}
                  />
                ))}
            </Tabs>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} mt={4}>
            <Invite survey={survey} tab={value} setSurvey={setSurvey} />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12} mt={4}>
            <Stack direction="row" justifyContent="space-between">
              <WbOutlineButton
                CustomOutlineButtonText={'Previous'}
                onClick={() =>
                  navigate(
                    paths.questionPanel.replace(
                      ':token',
                      encodeURIComponent(token)
                    ),
                    {state: {survey: survey}}
                  )
                }
              ></WbOutlineButton>
              <div>
                <Stack direction="row" spacing={1}>
                  <WbButton
                    CustomButtonText="Save "
                    onClick={() => surveysApi.put(survey).then(e => {})}
                  ></WbButton>
                  <WbButton
                    CustomButtonText="Save and next"
                    onClick={() =>
                      surveysApi
                        .put(survey)
                        .then(
                          e =>
                            navigate(
                              paths.schedulePanel.replace(
                                ':token',
                                encodeURIComponent(token)
                              ),
                              {state: {survey: survey}}
                            ),
                          {state: {survey: survey}}
                        )
                    }
                  ></WbButton>
                </Stack>
              </div>
              <PublishButton></PublishButton>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
