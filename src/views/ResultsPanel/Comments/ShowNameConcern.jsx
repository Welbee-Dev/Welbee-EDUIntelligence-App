import {circularProgressClasses, Grid} from '@mui/material'
import React, {useState} from 'react'
import WbButton from '../../../components/common/WbButton'
import WbOutlineButton from '../../../components/common/WbOutlineButton'
import commentsApi from '../../../services/api/comments/commentsApi'

export default function ShowNameConcern({
  showHideConcerned,
  participantId,
  isAnonymous,
}) {
  const [showWarning, setShowWarning] = useState(false)
  const [revealName, setRevealName] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  const handleRevealName = () => {
    setLoading(true)
    commentsApi
      .getCommenterName(participantId)
      .then(data => {
        if (data) setName(data.firstName + ' ' + data.lastName)
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }
  return !isAnonymous ? (
    <Grid container>
      <Grid item lg={12}>
        This was anonymous survey and you can only reveal the name of the
        student if the comment gives rise to a safeguarding concern?
      </Grid>
      <Grid item lg={12}>
        <WbOutlineButton
          CustomOutlineButtonText="Yes"
          onClick={() => {
            if (!showWarning) setShowWarning(true)
            else {
              setRevealName(true)
              handleRevealName()
            }
          }}
        ></WbOutlineButton>
        <WbButton
          CustomButtonText="No"
          onClick={() => {
            setShowWarning(false)
            setRevealName(false)
            showHideConcerned(false)
          }}
        ></WbButton>
      </Grid>
    </Grid>
  ) : revealName ? (
    loading ? (
      <circularProgressClasses />
    ) : (
      <Grid container>
        <Grid item lg={12}>
          Student Name: {name}
        </Grid>
        <Grid item lg={12}>
          <WbButton
            CustomButtonText="Close"
            onClick={() => {
              setShowWarning(false)
              setRevealName(false)
              showHideConcerned(false)
            }}
          ></WbButton>
        </Grid>
      </Grid>
    )
  ) : (
    <Grid container>
      <Grid item lg={12}>
        {showWarning
          ? `This was anonymous survey. If this comments gives rise to a possible safeguarding concern
   , you can choose to reveal the name of the pupil who left this comment. Do want to reveal the name of the student?`
          : 'Does this comment give rise to possible safeguarding concern?'}
      </Grid>
      <Grid item lg={12}>
        <WbOutlineButton
          CustomOutlineButtonText="Yes"
          onClick={() => {
            if (!showWarning) setShowWarning(true)
            else {
              setRevealName(true)
              handleRevealName()
            }
          }}
        ></WbOutlineButton>
        <WbButton
          CustomButtonText="No"
          onClick={() => {
            setShowWarning(false)
            setRevealName(false)
            showHideConcerned(false)
          }}
        ></WbButton>
      </Grid>
    </Grid>
  )
}
