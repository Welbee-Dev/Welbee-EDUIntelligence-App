import {Grid, Link, MenuItem} from '@mui/material'
import React, {useEffect, useState} from 'react'
import surveysApi from '../../../services/api/surveys/surveysApi'
import {AUDIENCE, CUSTOMER_TYPE} from '../../../utils/constants'
import WbAlert from '../../../components/common/WbAlert'
import questionsApi from '../../../services/api/questionLibrary/questionsApi'
import WbTextField from '../../../components/common/WbTextField'
import commentsApi from '../../../services/api/comments/commentsApi'
import WbModal from '../../../components/common/WbModal'
import ShowNameConcern from './ShowNameConcern'
import ReplyComment from './ReplyComment'
import useCustomerData from '../../../hooks/useCustomerData'

export default function Comments() {
  const {customerType, id} = useCustomerData()
  debugger
  const [loading, setLoading] = useState(false)
  const [surveys, setSurveys] = useState([])
  const [questions, setQuestions] = useState([])
  const [schools, setSchools] = useState([])
  const [comments, setComments] = useState([])
  const [audiences, setAudiences] = useState([])

  const [selectedSurvey, setSelectedSurvey] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [selectedSchool, setSelectedSchool] = useState(null)
  const [selectedAudience, setSelectedAudience] = useState(null)
  const [showConcerned, setShowConcerned] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState(-1)

  const loadComments = () => {
    if (selectedSurvey !== null) {
      setLoading(true)
      commentsApi
        .get(
          selectedSurvey?.id,
          selectedQuestion?.id ? selectedQuestion?.id : null,
          selectedSchool?.id ? selectedSchool?.id : null
        )
        .then(data => {
          setComments(data)
        })
        .finally(() => setLoading(false))
    }
  }

  const getDate = String => {
    var d = new Date(String).toDateString()
    return d
  }

  const loadAudiences = () => {
    let newAudiences = [{id: null, name: 'All'}]
    if (selectedSurvey !== null) {
      if (
        selectedSurvey.audience === 1 ||
        selectedSurvey.audience === 3 ||
        selectedSurvey.audience === 5 ||
        selectedSurvey.audience === 7
      ) {
        newAudiences.push({id: 1, name: 'Staff'})
      }

      if (
        selectedSurvey.audience === 2 ||
        selectedSurvey.audience === 3 ||
        selectedSurvey.audience === 5 ||
        selectedSurvey.audience === 7
      ) {
        newAudiences.push({id: 2, name: 'Parents'})
      }

      if (
        selectedSurvey.audience === 4 ||
        selectedSurvey.audience === 5 ||
        selectedSurvey.audience === 6 ||
        selectedSurvey.audience === 7
      ) {
        newAudiences.push({id: 4, name: 'Students'})
      }
      setSelectedAudience(newAudiences[0])
    }
    setAudiences(newAudiences)
  }

  useEffect(() => {
    loadComments()
    loadAudiences()
  }, [selectedSurvey, selectedQuestion, selectedSchool])

  useEffect(() => {
    surveysApi
      .getSurveyForResults(
        customerType === CUSTOMER_TYPE.School ? id : 0,
        customerType === CUSTOMER_TYPE.MAT ? id : 0
      )
      .then(data => {
        setSurveys(data)
        // if (data.length > 0) {
        //   setSelectedSurvey(data[0])
        // }
        if (customerType === CUSTOMER_TYPE.MAT) {
          setSchools(data[0].schools)
        } else {
          let ss = [{id: id, name: ''}]
          setSchools(ss)
          setSelectedSchool(ss[0])
        }
        questionsApi
          .getListByIds(data[0].surveyQuestions.map(s => s.questionId))
          .then(questions => {
            setQuestions(questions)
            // if (questions.length > 0) {
            //   setSelectedQuestion(questions[0])
            // }
          })
      })
      .catch(e => WbAlert({message: e.message, type: 'error'}))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="right-container">
          <div className="">Comments</div>
        </div>
      </Grid>
      <Grid item xs={12} className="body-container" style={{margin: 20}}>
        <Grid container>
          <Grid item xs={4}>
            <WbTextField
              select
              label="Select Survey"
              value={selectedSurvey}
              onChange={e => setSelectedSurvey(e.target.value)}
            >
              {surveys.map(s => (
                <MenuItem value={s}>{s.name}</MenuItem>
              ))}
            </WbTextField>
          </Grid>
          <Grid item xs={8}>
            <WbTextField
              select
              label="Select Question"
              value={selectedQuestion}
              onChange={e => {
                setSelectedQuestion(e.target.value)
              }}
            >
              {questions.map(s => (
                <MenuItem value={s}>{s.staffText}</MenuItem>
              ))}
            </WbTextField>
            {customerType === CUSTOMER_TYPE.MAT && (
              <WbTextField
                select
                label="Select School"
                value={selectedSchool}
                onChange={e => setSelectedSchool(e.target.value)}
              >
                {schools.map(s => (
                  <MenuItem value={s}>{s.name}</MenuItem>
                ))}
              </WbTextField>
            )}
            <WbTextField
              select
              label="Audiences"
              value={selectedAudience}
              onChange={e => setSelectedAudience(e.target.value)}
            >
              {audiences.map(s => (
                <MenuItem value={s}>{s.name}</MenuItem>
              ))}
            </WbTextField>
          </Grid>
          {comments
            .filter(x =>
              selectedAudience?.id ? x.audience === selectedAudience?.id : true
            )
            .map(c => (
              <Grid item xs={12} style={{padding: 10}}>
                <div>{getDate(c.dateTime)}</div>
                <div>{c.comment}</div>
                {c.audience === AUDIENCE.STUDENT ? (
                  <Link
                    className="link"
                    onClick={e => {
                      setShowConcerned(true)
                      setSelectedParticipant(c.participantId)
                    }}
                  >
                    Concerned about this comment?
                  </Link>
                ) : (
                  <ReplyComment commentId={c.id} isAdmin={true} />
                )}
              </Grid>
            ))}
        </Grid>
      </Grid>
      {showConcerned && (
        <WbModal
          title="Concerned about this comment?"
          content={
            <ShowNameConcern
              showHideConcerned={setShowConcerned}
              participantId={selectedParticipant}
              isAnonymous={selectedSurvey.anonimous}
            />
          }
          onClose={() => setShowConcerned(false)}
        />
      )}
    </Grid>
  )
}
