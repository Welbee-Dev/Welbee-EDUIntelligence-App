import React, {useEffect} from 'react'
import AddedQuestions from '../../SurveyPanel/QuestionPanel/AddedQuestions'
import {Grid, Select} from '@mui/material'
import WbTextField from '../../../components/common/WbTextField'
import MenuItem from '@mui/material/MenuItem'
import {useState} from 'react'
import QuestionsList from '../../SurveyPanel/QuestionPanel/QuestionsList'
import questionsApi from '../../../services/api/questionLibrary/questionsApi'
import tagsApi from '../../../services/api/questionLibrary/tagsApi'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

export default function Questions() {
  const audience = [
    {id: 1, name: 'Staff'},
    {id: 2, name: 'Parent'},
    {id: 4, name: 'Student'},
    {id: 3, name: 'Staff & Parent'},
    {id: 5, name: 'Staff & Student'},
    {id: 6, name: 'Parent & Student'},
    {id: 7, name: 'Staff, Parent & Student'},
  ]

  const [index, setIndex] = useState(null)
  const [selectedAudience, setSelectedAudience] = useState(null)
  const [questions, setQuestions] = useState([])
  const [allQuestions, setAllQuestions] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    questionsApi
      .getAll()
      .then(res => {
        debugger
        setAllQuestions(res)
        // setQuestions(res)
      })
      .catch(err => {
        console.log('error', err)
      })
    tagsApi.get().then(res => {
      setTags(res)
    })
  }, [])

  const handleAddNewQuestion = val => {
    debugger
    if (audience.length === 0) {
      alert('Please select an audience')
      return
    }
    setIndex(questions?.lengt)
    val.audiences = selectedAudience
    val.isAdmin = true
    //val.order = questions?.length
    console.log('added / updated question', val)
    setQuestions([
      ...questions,
      {
        ...val,
        questionSettings: {...val.questionSettings},
        sliderResponseAttributes: {...val.sliderResponseAttributes},
        multiOptionResponseAttributes: val?.multiOptionResponseAttributes
          ? [...val.multiOptionResponseAttributes]
          : null,
        followupQuestions: val.followupQuestions
          ? [...val.followupQuestions]
          : null,
        openResponseAttributes: {...val.openResponseAttributes},
        isAdmin: true,
        questionTag: [
          ...selectedTags.map(x => {
            return {
              tagId: x.id,
              questionId: 0,
            }
          }),
        ],
      },
    ])
  }
  const getPriority = () => {
    debugger
    if (
      selectedAudience === 1 ||
      selectedAudience === 2 ||
      selectedAudience === 4
    ) {
      return [selectedAudience]
    }
    if (selectedAudience === 3) {
      return [1, 2]
    }
    if (selectedAudience === 5) {
      return [1, 4]
    }
    if (selectedAudience === 6) {
      return [2, 4]
    }
    if (selectedAudience === 7) {
      return [1, 2, 4]
    }
  }
  return (
    <Grid container p={10}>
      <Grid item xs={6}>
        <WbTextField
          select
          label="Audience"
          onChange={e => {
            {
              debugger
              setIndex(null)
              setSelectedAudience(e.target.value)
              let filteredQuestions = allQuestions?.filter(
                q => q.audiences === e.target.value
              )
              if (filteredQuestions.length > 0)
                setQuestions([...filteredQuestions])
            }
          }}
        >
          {audience.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </WbTextField>
      </Grid>
      <Grid item xs={6}>
        <Select
          fullWidth
          multiple
          label="Tags"
          placeholder="Tags"
          value={selectedTags}
          getOptionLabel={option => option.name}
          //renderValue={selected => selected.join(', ')}
          renderValue={selected => (
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
              {selectedTags.map(value => (
                <Chip
                  key={value.id}
                  label={value.name}
                  onDelete={() => {
                    setSelectedTags(
                      selectedTags.filter(tag => tag.id !== value.id)
                    )
                  }}
                />
              ))}
            </Box>
          )}
          onChange={e => {
            // const {
            debugger
            setSelectedTags(e.target.value)
            //   target: {value},
            // } = e
            // setSelectedTags(
            //   typeof value === 'string' ? value.split(',') : value
            // )
          }}
        >
          {tags?.map(option => (
            <MenuItem key={option.id} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <QuestionsList
          survey={null}
          questions={questions}
          onQuestionChange={questions => {
            questions && questions.length > 0
              ? setQuestions([...questions])
              : setQuestions([])
          }}
          index={index}
          setIndex={setIndex}
          priorityAudience={selectedAudience ? getPriority() : [1]}
        ></QuestionsList>
        {selectedAudience &&
          selectedAudience !== 0 &&
          selectedTags &&
          selectedTags.length > 0 && (
            <AddedQuestions onChange={handleAddNewQuestion} />
          )}
      </Grid>
    </Grid>
  )
}
