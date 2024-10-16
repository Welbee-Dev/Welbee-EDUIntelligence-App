import React, {useEffect} from 'react'
import {Chip, Grid, Stack, MenuItem} from '@mui/material'
import surveysApi from '../../services/api/surveys/surveysApi'
import WbButton from '../../components/common/WbButton'
import {useNavigate} from 'react-router-dom'
import paths from '../../routes/paths'
import {AUDIENCE, AUDIENCE_SELECT} from '../../utils/constants'
import CreateSurvey from '../SurveyPanel/CreateSurvey'
import AddIcon from '@mui/icons-material/Add'
import WbTextField from '../../components/common/WbTextField'
import SurveyCard from './SurveyCard'
import welbeelogo from '../../components/assets/images/welbee_logo.svg'
import Header from '../../components/layouts/header/Header'
import useCustomerData from '../../hooks/useCustomerData'

export default function Dashboard() {
  const customer = useCustomerData()

  const [surveys, setSurveys] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [createNew, setCreateNew] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (surveys.length > 0) return
    setLoading(true)
    surveysApi
      .getAll(customer.id, customer.customerType, 50)
      .then(res => {
        setSurveys(res.sort((a, b) => a.name.localeCompare(b.name)))
      })
      .catch(err => {})
      .finally(() => setLoading(false))
  }, [])

  const getChip = audience =>
    audience?.map(a => (
      <Chip
        style={{
          backgroundColor:
            a === 'Staff' ? '#ff5939' : a === 'Parent' ? '#45338c' : '#58b5e0',
          color: 'white',
        }}
        label={a}
      />
    ))

  const getAudience = audience => {
    switch (audience) {
      case AUDIENCE.STAFF:
        return getChip(['Staff'])
      case AUDIENCE.PARENT:
        return getChip(['Parent'])
      case AUDIENCE.STUDENT:
        return getChip(['Student'])
      case AUDIENCE.STAFF + AUDIENCE.PARENT:
        return getChip(['Staff', 'Parent'])
      case AUDIENCE.STAFF + AUDIENCE.STUDENT:
        return getChip(['Staff', 'Student'])
      case AUDIENCE.PARENT + AUDIENCE.STUDENT:
        return getChip(['Parent', 'Student'])
      case AUDIENCE.STAFF + AUDIENCE.PARENT + AUDIENCE.STUDENT:
        return getChip(['Staff', 'Parent', 'Student'])
      default:
        return [audience]
    }
  }
  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="left-container">
          <div className="school-logo">
            <img src={welbeelogo} alt="School Logo" />
          </div>
          <div className="all-surveys">
            <ul>
              <li>
                All Surveys
                <span>10</span>
              </li>
              <li>
                Live Surveys
                <span>2</span>
              </li>
              <li>
                Draft Surveys
                <span>5</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-container">
          <div className="survey-dashboard">
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <h1>All surveys</h1>
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12} my={3}>
                <Grid container justifyContent="space-between">
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Stack direction={'row'} spacing={1}>
                      <WbButton
                        CustomButtonText={'Create new survey'}
                        onClick={() => setCreateNew(true)}
                        startIcon={<AddIcon />}
                      ></WbButton>

                      <WbTextField label="Sort" select sx={{width: '300px'}}>
                        <MenuItem value={1} selected>
                          Sort alphabetically
                        </MenuItem>
                        <MenuItem value={2}>At least</MenuItem>
                        <MenuItem value={3}>Maximum</MenuItem>
                      </WbTextField>
                    </Stack>
                  </Grid>

                  <Grid item lg={3} md={6} sm={12} xs={12}>
                    <WbTextField
                      label="Search"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    ></WbTextField>
                  </Grid>
                </Grid>
              </Grid>
              {createNew && (
                <CreateSurvey
                  onClose={() => setCreateNew(!createNew)}
                ></CreateSurvey>
              )}
            </Grid>

            <Grid container spacing={2}>
              {loading ? (
                <h2>Loading...</h2>
              ) : (
                surveys
                  ?.filter(x =>
                    search === ''
                      ? (x.name = x.name)
                      : x.name.toLowerCase().indexOf(search.toLowerCase()) !==
                        -1
                  )
                  .map(survey => {
                    return (
                      <Grid item xxl={3} xl={4} lg={4} md={6} sm={6} xs={12}>
                        <SurveyCard survey={survey}></SurveyCard>
                      </Grid>
                      // <Grid item lg={4} md={4} sm={6} xs={12}>
                      //   <Card variant="outlined">
                      //     <CardContent>
                      //       <Chip label="Draft" color="primary" size="small" />

                      //       <div className="surveyname">{survey.name}</div>
                      //       <div className="survey-date">Created 1 hour ago</div>

                      //       {/* <Typography
                      //       sx={{fontSize: 14}}
                      //       color="text.secondary"
                      //       gutterBottom
                      //     >
                      //       Audience{' '}
                      //     </Typography> */}
                      //       <Stack direction={'row'} spacing={1} mb={1}>
                      //         {getAudience(survey.audience)}
                      //       </Stack>
                      //       <Stack direction={'row'} spacing={1}>
                      //         {survey?.surveysTags?.map(t => (
                      //           <Chip label={t} />
                      //         ))}
                      //       </Stack>
                      //     </CardContent>
                      //     <CardActions>
                      //       <Grid item lg={6}>
                      //         <WbButton
                      //           CustomButtonText={'Edit'}
                      //           onClick={() =>
                      //             navigate(
                      //               paths.questionPanel.replace(
                      //                 ':token',
                      //                 encodeURIComponent(survey.token)
                      //               )
                      //             )
                      //           }
                      //         ></WbButton>
                      //       </Grid>
                      //       <Grid
                      //         item
                      //         lg={6}
                      //         style={{
                      //           display: 'flex',
                      //           justifyContent: 'flex-end',
                      //         }}
                      //       >
                      //         <WbOutlineButton
                      //           CustomOutlineButtonText={'Delete'}
                      //           startIcon={<DeleteOutline></DeleteOutline>}
                      //         ></WbOutlineButton>
                      //       </Grid>
                      //     </CardActions>
                      //   </Card>
                      // </Grid>
                    )
                  })
              )}
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
}
