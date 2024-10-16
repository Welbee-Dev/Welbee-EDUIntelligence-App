import {Autocomplete, Stack, TextField, Grid, FormControl} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {surveysApi, surveyTagsApi} from '../../../services'
import WbButton from '../../../components/common/WbButton'
import WbAlert from '../../../components/common/WbAlert'
import {useNavigate} from 'react-router-dom'
import paths from '../../../routes/paths'

export default function SurveySettings({survey, setSurvey}) {
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (survey?.surveysTags?.length > 0)
      setSelectedTags([...survey?.surveysTags?.map(t => ({tag: t}))])

    surveyTagsApi.get(survey.customerId, survey.customerType).then(response => {
      setTags([
        ...response?.map(t => {
          return {
            tag: t.tag,
          }
        }),
      ])
    })
  }, [])

  return (
    <Grid container p={3} spacing={2}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <label>Survey Name</label>
        <FormControl fullWidth>
          <TextField
            //label={'Survey Name'}
            value={survey?.name}
            onChange={event => setSurvey({...survey, name: event.target.value})}
            sx={{marginTop: '10px'}}
            className="survey-name-txt"
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <label>Tags</label>
        <Autocomplete
          sx={{marginTop: '10px'}}
          freeSolo
          multiple
          value={selectedTags}
          className="survey-name-txt"
          options={tags?.map(t => t)}
          getOptionLabel={option => option.tag}
          onChange={(event, newValue) => {
            if (selectedTags.length >= 3) {
              WbAlert({
                message: 'You can only select up to 3 tags',
                type: 'error',
              })
              return
            }
            if (newValue.length > 0) {
              if (newValue[newValue.length - 1].inputValue) {
                surveyTagsApi.post({
                  tag: newValue[newValue.length - 1].inputValue,
                  schoolId: survey.schoolId,
                  matId: survey.matId,
                })
                setTags([
                  ...tags,
                  {tag: newValue[newValue.length - 1].inputValue},
                ])
                setSelectedTags([
                  ...selectedTags,
                  {tag: newValue[newValue.length - 1].inputValue},
                ])
              } else {
                setSelectedTags([
                  ...selectedTags,
                  {tag: newValue[newValue.length - 1].tag},
                ])
              }
            }
          }}
          filterOptions={(options, params) => {
            if (params.inputValue === '') return options
            const filtered = [
              ...options.filter(option =>
                option.tag
                  .toLocaleLowerCase()
                  .includes(params.inputValue.toLocaleLowerCase())
              ),
            ]

            const {inputValue} = params
            // Suggest the creation of a new value
            const isExisting = options.some(option =>
              option.tag
                .toLocaleLowerCase()
                .includes(params.inputValue.toLocaleLowerCase())
            )
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue: inputValue,
                tag: `Add "${inputValue}"`,
              })
            }

            return filtered
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderInput={params => <TextField {...params} />}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right">
        <WbButton
          CustomButtonText={'Save'}
          onClick={() => {
            surveysApi
              .put({
                ...survey,
                name: survey?.name,
                surveysTags: selectedTags?.map(t => t.tag),
              })
              .then(response => {
                debugger
                setSurvey(response)
                window.location.href = paths.questionPanel.replace(
                  ':token',
                  encodeURIComponent(response.token)
                )
                WbAlert({
                  message: 'Survey updated successfully',
                  type: 'success',
                })
              })
          }}
        ></WbButton>
      </Grid>
    </Grid>
  )
}
