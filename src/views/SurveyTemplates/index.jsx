import {
  Grid,
  InputAdornment,
  Stack,
  FormControlLabel,
  Button,
  Modal,
  Box,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import surveyTemplatesApi from '../../services/api/surveyTemplates/surveyTemplatesApi'
import {Search} from '@mui/icons-material'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import paths from '../../routes/paths'
import WbButton from '../../components/common/WbButton'
import {surveysApi} from '../../services'
import SurveyTemplatePreview from './SurveyTemplatePreview'
import WbTextField from '../../components/common/WbTextField'
import WbSwitch from '../../components/common/WbSwitch'
import WestIcon from '@mui/icons-material/West'
import {CUSTOMER_TYPE} from '../../utils/constants'
import {tempCheckbox} from '../../components/assets/images'
import {tempRadio} from '../../components/assets/images'
import {tempText} from '../../components/assets/images'
import {tempRating} from '../../components/assets/images'
import {Config} from '../../utils/Config'
import useCustomerData from '../../hooks/useCustomerData'

export default function SurveyTemplates() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showTemplates, setShowTemplates] = useState(true)
  const [showPrevious, setShowPrevious] = useState(false)
  const [search, setSearch] = useState('')

  const navigate = useNavigate()
  const survey = useLocation()
  const customer = useCustomerData()
  const {audience, anonimous, shared} = useParams()

  useEffect(() => {
    setLoading(true)
    surveyTemplatesApi
      .get(customer.id, customer.customerType)
      .then(res => {
        setTemplates(
          //res.filter(t => t.audience.map(a => survey.audience.includes(a)))
          res.sort((a, b) => a.name.localeCompare(b.name))
        )
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }, [])

  const copyTemplate = id => {
    surveyTemplatesApi
      .copyTemplate(
        customer.id,
        customer.customerType,
        id,
        anonimous === 'true',
        shared === 'true'
      )
      .then(response =>
        navigate(
          paths.questionPanel.replace(
            ':token',
            encodeURIComponent(response.token)
          )
        )
      )
      .catch(error => {})
      .finally(() => {})
  }

  return (
    <div className="dashboard-container">
      <div className="left-container">
        <div className="template-tags">
          <ul>
            <li>Tag 1</li>
            <li>Tag 2</li>
          </ul>
        </div>
        <div className="template-back-btn">
          <WbButton
            CustomButtonText="Back"
            onClick={() => navigate(paths.dashboard)}
            sx={{width: '250px'}}
            startIcon={<WestIcon />}
          />
        </div>
      </div>
      <div className="right-container">
        <div className="search-template">
          <Grid container spacing={2} justifyContent="center">
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1>Survey Library</h1>
              <p>
                Select one of our survey templates, or re-use one of your
                previous surveys.
              </p>
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
              <WbTextField
                label="Search template"
                value={search}
                onChange={e => setSearch(e.target.value)}
                startAdornment={
                  <InputAdornment position="end">
                    <Search></Search>
                  </InputAdornment>
                }
              ></WbTextField>
            </Grid>
          </Grid>
        </div>

        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <FormControlLabel
                control={
                  <WbSwitch
                    checked={showPrevious}
                    onChange={e => setShowPrevious(!showPrevious)}
                  />
                }
                label="Show previously used surveys"
              />
              <FormControlLabel
                control={
                  <WbSwitch
                    checked={showTemplates}
                    onChange={e => setShowTemplates(e.target.checked)}
                  />
                }
                label="All templates"
              />
            </Stack>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="template-list">
              <ul>
                {templates
                  ?.filter(x => {
                    return showPrevious &&
                      x.schoolId ===
                        (customer.customerType === CUSTOMER_TYPE.School
                          ? customer.id
                          : 0) &&
                      x.matId ===
                        (customer.customerType === CUSTOMER_TYPE.MAT
                          ? customer.id
                          : 0) &&
                      showTemplates &&
                      x.schoolId === 0 &&
                      x.matId === 0 &&
                      search !== ''
                      ? x.name.toLowerCase().includes(search.toLowerCase())
                      : true
                  })
                  .map((template, index) => (
                    <li key={index}>
                      <div className="template">
                        <div className="template-header relative">
                          <div className="pink inner-padding relative template-width">
                            <img
                              src={`${Config.BASE_URL}/Artifact/download?fileName=temp-checkbox.png`}
                              alt="checkbox"
                            />
                          </div>
                          <div className="template-overlay">
                            <Stack direction="column" spacing={2}>
                              <Button
                                variant="contained"
                                onClick={() => copyTemplate(template.id)}
                                className="use-template-btn"
                              >
                                Use template
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => setSelectedTemplate(template)}
                                className="preview-btn"
                              >
                                Preview template
                              </Button>
                            </Stack>
                          </div>
                        </div>

                        <div className="template-content">
                          <h4>{template.name}</h4>
                        </div>

                        <div className="template-footer">
                          {template.surveyQuestions?.length} questions
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Grid>
          <Modal
            open={selectedTemplate}
            onClose={() => setSelectedTemplate(null)}
          >
            <Box sx={{width: '100%', height: '100%', backgroundColor: 'white'}}>
              <SurveyTemplatePreview
                template={{
                  ...selectedTemplate,
                }}
                onCopy={() => copyTemplate(selectedTemplate.id)}
                onClose={() => setSelectedTemplate(null)}
              ></SurveyTemplatePreview>
            </Box>
          </Modal>
        </Grid>
      </div>
    </div>
  )
}
