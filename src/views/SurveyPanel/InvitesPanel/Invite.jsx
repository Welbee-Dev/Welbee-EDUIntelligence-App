import React, {useEffect, useState} from 'react'
import {AUDIENCE} from '../../../utils/constants'
import {
  Alert,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from '@mui/material'
import {Edit} from '@mui/icons-material'
import {pink} from '@mui/material/colors'
import {surveysApi} from '../../../services'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import WbSwitch from '../../../components/common/WbSwitch'

export default function Invite({survey, tab, setSurvey}) {
  const [email, setEmail] = useState(false)
  const [portal, setPortal] = useState(false)
  const [sms, setSms] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [editSubject, setEditSubject] = useState(false)
  const [editMessage, setEditMessage] = useState(false)

  useEffect(() => {
    if (survey) {
      let n = null
      if (tab === AUDIENCE.STAFF) {
        n = JSON.parse(survey?.staffNotification)
      }
      if (tab === AUDIENCE.PARENT) {
        n = JSON.parse(survey?.parentNotification)
      }
      if (tab === AUDIENCE.STUDENT) {
        n = JSON.parse(survey?.pupilNotification)
        n.Email = true //ToDo need to remove this line
      }
      if (n) {
        setEmail(n.Email)
        setSms(n.Sms)
        setPortal(n.Portal)
        setSubject(n.Subject)
        setMessage(n.Message)
      }
    }
  }, [tab])
  useEffect(() => {
    if (survey) {
      let n = {
        Email: email,
        Sms: sms,
        Portal: portal,
        Subject: subject,
        Message: message,
      }
      let newSurvey = {...survey}
      if (tab === AUDIENCE.STAFF) {
        newSurvey = {...survey, staffNotification: JSON.stringify(n)}
      }
      if (tab === AUDIENCE.PARENT) {
        newSurvey = {...survey, parentNotification: JSON.stringify(n)}
      }
      if (tab === AUDIENCE.STUDENT) {
        newSurvey = {...survey, pupilNotification: JSON.stringify(n)}
      }
      setSurvey(newSurvey)
      //surveysApi.put(newSurvey).then(e => {})
    }
  }, [email, sms, portal, subject, message])

  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControl>
          <FormControlLabel
            control={
              <WbSwitch
                checked={email}
                onChange={e => setEmail(!email)}
              ></WbSwitch>
            }
            label="Notify by Email"
          ></FormControlLabel>
        </FormControl>
      </Grid>

      {/* <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControl>
          {tab === AUDIENCE.STUDENT ? (
            <FormControlLabel
              control={
                <WbSwitch
                  checked={portal}
                  onChange={e => setPortal(!portal)}
                ></WbSwitch>
              }
              label="Notify by Portal"
            ></FormControlLabel>
          ) : (
            <FormControlLabel
              control={
                <WbSwitch checked={sms} onChange={e => setSms(!sms)}></WbSwitch>
              }
              label="Notify by SMS"
            ></FormControlLabel>
          )}
        </FormControl>
      </Grid> */}

      <Grid item lg={12} md={12} sm={12} xs={12} mt={4} mb={4}>
        <Alert severity="info">
          The email invitation below will be sent to participants unless you
          choose to customise it. You can customize templates for each audience.
        </Alert>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        Email Subject:{' '}
        {editSubject ? (
          <TextField
            fullWidth
            value={subject}
            onChange={e => setSubject(e.target.value)}
            onBlur={e => setEditSubject(false)}
          ></TextField>
        ) : (
          <>
            {subject}
            <IconButton onClick={e => setEditSubject(true)}>
              <Edit fontSize="small" sx={{color: pink[500]}}></Edit>
            </IconButton>
          </>
        )}
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        {editMessage ? (
          <ReactQuill
            theme="snow"
            value={message}
            onChange={setMessage}
            onBlur={e => setEditMessage(false)}
          />
        ) : (
          <>
            <div dangerouslySetInnerHTML={{__html: message}}></div>

            <IconButton onClick={e => setEditMessage(true)}>
              <Edit fontSize="small" sx={{color: pink[500]}}></Edit>
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  )
}
