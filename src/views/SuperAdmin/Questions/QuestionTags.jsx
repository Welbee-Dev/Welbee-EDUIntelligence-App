import {Grid} from '@mui/material'
import React, {useEffect} from 'react'
import {Box, Chip, MenuItem, OutlinedInput, Select} from '@mui/material'
import tagsApi from '../../../services/api/questionLibrary/tagsApi'
import questionsApi from '../../../services/api/questionLibrary/questionsApi'
import {all} from 'axios'
import {Check} from '@mui/icons-material'

export default function QuestionTags() {
  const [tags, setTags] = React.useState([])
  const [allQuestions, setAllQuestions] = React.useState([])

  const [selectedTag, setSelectedTag] = React.useState([])

  useEffect(() => {
    questionsApi
      .getAll()
      .then(res => {
        setAllQuestions(res)
      })
      .catch(err => {
        console.log('error', err)
      })

    tagsApi.get().then(res => {
      debugger
      setTags(res)
    })
  }, [])
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Question Tags</h1>
      </Grid>
      <Grid item xs={12}>
        {/* <QuestionLibrary /> */}

        <Select
          fullWidth
          multiple
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={selectedTag => {
            debugger
            return (
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selectedTag.map(value => (
                  <Chip key={value.id} label={value.name} />
                ))}
              </Box>
            )
          }}
        >
          {tags?.map(tag => (
            <MenuItem key={tag.id} value={tag}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      {allQuestions.map(q => (
        <Grid item xs={12} key={q.id}>
          <Check />
          <h3>
            <b>Staff Text: </b>
            {q.staffText} <b>PArent</b>: {q.parentText}
            <b>Student</b>: {q.pupilText}
          </h3>
          <p>{q.answerType}</p>
        </Grid>
      ))}
    </Grid>
  )
}
