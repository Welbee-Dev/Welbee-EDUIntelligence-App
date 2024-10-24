import React, {useEffect} from 'react'
import {Container, Grid, Stack, Chip, MenuItem} from '@mui/material'
import Header from '../../components/layouts/header/Header'
import WbTextField from '../../components/common/WbTextField'
// import WbFloatButton from '../../components/common/WbFloatButton'
import WbFloatButtonV2 from '../../components/common/WbFloatButtonV2'
import useCustomerData from '../../hooks/useCustomerData'
import surveysApi from '../../services/api/surveys/surveysApi'
import moment from 'moment';


// import Chatbot from '../../Chatbot';

export default function EDUDashboard() {  
  const customer = useCustomerData()
  const [surveyOptions, setSurveyOptions] = React.useState([])
  const [survey, setSurvey] = React.useState([])
  const [selectedSurvey, setSelectedSurvey] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    if (surveyOptions.length > 0) return
    setLoading(true)
    surveysApi
      .getAll(customer.id, customer.customerType, 50)
      .then(res => {              
        setSurveyOptions(res); 
        setSelectedSurvey(res[0].id);      
        surveysApi.getBySurveyId(res[0].id).then(res => {
          setSurvey(res);      
        })         
      })
      .catch(err => {})
      .finally(() => setLoading(false))
  }, [])

  let handleSurveyChange = (e) => {      
    setSelectedSurvey(e.target.value); 
    surveysApi.getBySurveyId(e.target.value).then(res => {
      setSurvey(res);      
    })    
  }

  var  getDateString = function(date, format) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    getPaddedComp = function(comp) {
        return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
    },
    formattedDate = format,
    o = {
        "y+": date.getFullYear(), // year
        "M+": months[date.getMonth()], //month
        "d+": getPaddedComp(date.getDate()), //day
        "h+": getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : date.getHours()), //hour
         "H+": getPaddedComp(date.getHours()), //hour
        "m+": getPaddedComp(date.getMinutes()), //minute
        "s+": getPaddedComp(date.getSeconds()), //second
        "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
        "b+": (date.getHours() >= 12) ? 'PM' : 'AM'
    };

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            formattedDate = formattedDate.replace(RegExp.$1, o[k]);
        }
    }
    return formattedDate;
};

  const getAudienceChip = audience => {
    switch (audience) {
      case 1:
        return <Chip className="audience-chip" label={'Staff'} size="small" />
      case 2:
        return <Chip className="audience-chip" label={'Parents'} size="small" />
      case 3:
        return (
          <>
            <Chip className="audience-chip" label={'Staff'} size="small" />
            <Chip className="audience-chip" label={'Parent'} size="small" />
          </>
        )
      case 4:
        return (
          <Chip className="audience-chip" label={'Students'} size="small" />
        )
      case 5:
        return (
          <>
            <Chip className="audience-chip" label={'Students'} size="small" />
            <Chip className="audience-chip" label={'Staff'} size="small" />
          </>
        )
      case 6:
        return (
          <>
            <Chip className="audience-chip" label={'Students'} size="small" />
            <Chip className="audience-chip" label={'Parents'} size="small" />
          </>
        )
      default:
        return (
          <>
            <Chip className="audience-chip" label={'Staff'} size="small" />
            <Chip className="audience-chip" label={'Students'} size="small" />
            <Chip className="audience-chip" label={'Parents'} size="small" />
          </>
        )
    }
  }

  return  (
    <>
      <Header />
      <div className="main-container insights-container">
        <Container maxWidth='lg'>
          <Grid container mt={3}>

            <Grid item lg={7} md={7} sm={6} xs={12}>
              <h1>Latest Survey</h1>
              <Stack direction="column" mt={4}>
                <h2>{survey.name}</h2>
                <Stack direction="row" alignItems="center" my={2}>
                  Audience:
                  <Stack direction="row" spacing={0.5} ml={0.5}>
                    {/* <Chip className="audience-chip" label={'Student'} size="small" />
                    <Chip className="audience-chip" label={'Staff'} size="small" /> */}
                     {getAudienceChip(survey.audience)}
                  </Stack>
                </Stack>
                <div className="launch-date">Launch date/time: <span>{getDateString(new Date(survey.createdAt ), "M d, y at h:m b")}</span></div>
                <div className="launch-date">End date/time: <span>{getDateString(new Date(survey.createdAt ), "M d, y at h:m b")}</span></div>
              </Stack>
            </Grid>

            <Grid item lg={5} md={5} sm={6} xs={12}>
              <Grid container spacing={1}>               
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <WbTextField id="SurveyDropDown" label="Select Survey"  onChange={handleSurveyChange} select>                 
                    {surveyOptions.map((result)=>(<MenuItem  key={result.name} value={result.id}>{result.name}</MenuItem>))}
                  </WbTextField>
                </Grid>     
                {customer.customerType !== 2 ? (
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                      <WbTextField label="Select School" select>
                        <MenuItem value={1} selected={true}>School One</MenuItem>
                        <MenuItem value={2}>School Two</MenuItem>
                        <MenuItem value={3}>School Three</MenuItem>
                      </WbTextField>
                    </Grid>
                   ): null}                  
              </Grid>
            </Grid>
          </Grid>

          <Grid container mt={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className='body-container'>
                heatmap here
              </div>
            </Grid>
          </Grid>
        </Container>        
      </div>
      {/* <div className="App">
        <header className="App-header">
          <h1>AI Chatbot</h1>
          <Chatbot />
        </header>
      </div> */}
      <WbFloatButtonV2  surveyInfo={{ surveyId: selectedSurvey }} />
    </>
  )
}
