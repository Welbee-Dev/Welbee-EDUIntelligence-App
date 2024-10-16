import React from 'react'
import {Grid} from '@mui/material'

export default function submissionBlocker({type}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="welcome">
          <h1>
            {type === 'closed'
              ? 'This survey is closed'
              : type === 'end'
                ? <div><p>Congratulations!</p>You have completed the survey 🎉</div>
                : 'You have already submitted this survey'}
          </h1>
        </div>
      </Grid>
    </Grid>
  )
}
