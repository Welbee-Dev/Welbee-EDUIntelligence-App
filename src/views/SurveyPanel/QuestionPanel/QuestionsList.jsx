import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tabs,
  Toolbar,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import QuestionRow from '../../../components/screens/surveyForms/questions/QuestionRow'
import {AUDIENCE_SELECT, QUESTION_TYPE} from '../../../utils/constants'
import MultipleOption from '../../../components/screens/surveyForms/questions/QuestionTypeComponents/MultipleOption'
import WbTabPanel from '../../../components/common/WbTabPanel'
import WbTab from '../../../components/common/WbTab'
import {Close, MoreHoriz} from '@mui/icons-material'
import surveyQuestionApi from '../../../services/api/surveys/surveyQuestionApi'
import WbAlert from '../../../components/common/WbAlert'
import TextQuestion from '../../../components/screens/surveyForms/questions/QuestionTypeComponents/TextQuestion'
import RankingQuestion from '../../../components/screens/surveyForms/questions/QuestionTypeComponents/RankingQuestion'
import NumberSlider from '../../../components/screens/surveyForms/questions/QuestionTypeComponents/NumberSlider'
import WbOutlineButton from '../../../components/common/WbOutlineButton'
import MultipleSelect from '../../../components/screens/surveyForms/questions/QuestionTypeComponents/MultipleSelect'
import questionsApi from '../../../services/api/questionLibrary/questionsApi'
import {useParams} from 'react-router-dom'

export default function QuestionsList({
  survey,
  questions,
  index,
  setIndex,
  onQuestionChange,
  priorityAudience,
  setSurvey,
}) {
  const [value, setValue] = useState(1)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const token = useParams().token

  const updateQuestion = changes => {
    let qq = [...questions]
    qq[index] = {...changes}
    onQuestionChange([...qq])
  }

  useEffect(() => {
    setValue(priorityAudience ? Math.min(...priorityAudience) : 1)
  }, [index])

  const renderTabBar = i => {
    return (
      <Toolbar className="question-audience-tabs">
        <Tabs
          value={value}
          onChange={(e, v) => setValue(v)}
          centered
          className="custom-tabs"
          aria-label="preview-tab"
        >
          {AUDIENCE_SELECT.filter(x => priorityAudience?.includes(x.value)).map(
            (audience, index) => (
              <WbTab
                value={audience.value}
                label={audience.label}
                onClick={e => setValue(audience.value)}
              />
            )
          )}
        </Tabs>
        <Box
          sx={{
            justifyItems: 'flex-end',
            display: 'flex',
          }}
        >
          <IconButton
            onClick={e => setAnchorEl(e.currentTarget)}
            disableElevation
          >
            <MoreHoriz></MoreHoriz>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={e => setAnchorEl(null)}
          >
            <MenuItem
              onClick={e => {
                if (questions[i].id > 0) {
                  surveyQuestionApi
                    .delete(survey.id, questions[i].id)
                    .then(res => {
                      WbAlert({message: 'Question deleted', error: 'success'})
                      let qq = [...questions]
                      qq.splice(i, 1)
                      onQuestionChange([...qq])
                      setIndex(null)
                      setAnchorEl(null)
                    })
                    .catch(err => {
                      WbAlert({
                        message: 'Error deleting question',
                        type: 'error',
                      })
                    })
                } else {
                  onQuestionChange([...questions.filter((x, idx) => idx !== i)])
                  setIndex(null)
                  setAnchorEl(null)
                }
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          <IconButton onClick={e => setIndex(null)}>
            <Close></Close>
          </IconButton>
        </Box>
      </Toolbar>
    )
  }

  const renderAddButton = i => {
    return (
      <WbOutlineButton
        onClick={e => {
          debugger
          questionsApi
            .post({
              ...questions[i],
              id: survey?.templateId !== survey?.id ? 0 : questions[i].id,
              questionSettings: {
                ...questions[i].questionSettings,
              },
              followupQuestions: questions[i].followupQuestions
                ? [...questions[i].followupQuestions]
                : null,
              multiOptionResponseAttributes: questions[i]
                .multiOptionResponseAttributes
                ? [...questions[i].multiOptionResponseAttributes]
                : null,
              openResponseAttributes: {
                ...questions[i].openResponseAttributes,
              },
              sliderResponseAttributes: {
                ...questions[i].sliderResponseAttributes,
              },
              tags: questions[i].tags ? [...questions[i].tags] : null,
            })
            .then(res => {
              if (survey) {
                if (questions[i].id === 0) {
                  surveyQuestionApi
                    .post({
                      surveyId: survey.id,
                      questionId: res.id,
                    })
                    .then(res => {})
                }
                if (questions[i].id !== 0 && survey.id !== survey.templateId) {
                  surveyQuestionApi
                    .addSurveyQuestionRemoveTempId(
                      survey.id,
                      questions[i].id,
                      res.id
                    )
                    .then(res => {
                      setSurvey({
                        ...survey,
                        templateId: survey.id,
                      })
                    })
                }
              }

              let qq = [
                ...questions.map(x => ({
                  ...x,
                  multiOptionResponseAttributes: x.multiOptionResponseAttributes
                    ? [...x.multiOptionResponseAttributes]
                    : null,
                  questionSettings: {...x.questionSettings},
                  followupQuestions: x.followupQuestions
                    ? [...x.followupQuestions]
                    : null,
                  openResponseAttributes: {
                    ...x.openResponseAttributes,
                  },
                  SliderResponseAttributes: {
                    ...x.sliderResponseAttributes,
                  },
                })),
              ]
              qq[i] = {
                ...res,
                sliderResponseAttributes: {
                  ...res.sliderResponseAttributes,
                },
                multiOptionResponseAttributes: res.multiOptionResponseAttributes
                  ? [...res.multiOptionResponseAttributes]
                  : null,
                questionSettings: {...res.questionSettings},
                followupQuestions: res.followupQuestions
                  ? [...res.followupQuestions]
                  : null,
                openResponseAttributes: {
                  ...res.openResponseAttributes,
                },
              }
              debugger

              onQuestionChange([...qq])

              WbAlert({
                message: 'Question saved successfully',
                type: 'success',
              })
            })
        }}
        CustomOutlineButtonText={'Save'}
        sx={{marginTop: '15px'}}
      ></WbOutlineButton>
    )
  }
  const renderForm = i => {
    return (
      <>
        {renderTabBar(i)}
        {AUDIENCE_SELECT.filter(x => priorityAudience.includes(x.value)).map(
          (audience, index) => (
            <WbTabPanel value={value} index={audience.value}>
              <div className="questions">
                <Grid container>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    {getFormType(questions[i].questionType, i, audience.value)}
                  </Grid>
                  <Grid item lg={12} textAlign="right">
                    {questions[i].isEditable && renderAddButton(i)}
                  </Grid>
                </Grid>
              </div>
            </WbTabPanel>
          )
        )}
      </>
    )
  }
  const getFormType = (t, i, tab) => {
    switch (t) {
      case QUESTION_TYPE.NUMBER_SLIDER:
      case QUESTION_TYPE.PERCENTAGE:
        return (
          <NumberSlider
            question={{...questions[i]}}
            updateQuestion={updateQuestion}
            audience={tab}
            isPriority={Math.min(...priorityAudience) === tab}
          ></NumberSlider>
        )

      case QUESTION_TYPE.MULTIPLE_SELECT:
        return (
          <MultipleSelect
            question={{...questions[i]}}
            updateQuestion={updateQuestion}
            audience={tab}
            isPriority={Math.min(...priorityAudience) === tab}
          ></MultipleSelect>
        )
      case QUESTION_TYPE.YES_NO:
      case QUESTION_TYPE.YES_NO_MAYBE:
      case QUESTION_TYPE.LIKERT:
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleOption
            question={{...questions[i]}}
            updateQuestion={updateQuestion}
            audience={tab}
            isPriority={Math.min(...priorityAudience) === tab}
          ></MultipleOption>
        )

      case QUESTION_TYPE.RANKING:
        return (
          <RankingQuestion
            question={{...questions[i]}}
            updateQuestion={updateQuestion}
            audience={tab}
            isPriority={Math.min(...priorityAudience) === tab}
          />
        )
      case QUESTION_TYPE.COMMENTS:
        return (
          <TextQuestion
            question={{...questions[i]}}
            updateQuestion={updateQuestion}
            audience={tab}
            isPriority={Math.min(...priorityAudience) === tab}
          ></TextQuestion>
        )
      default:
        return 'template to create ' + t
    }
  }
  const renderSingleQuestion = i => {
    let p = Math.min(...priorityAudience)
    return (
      <QuestionRow
        index={i}
        onChange={v => {
          setIndex(v)
          setValue(p)
        }}
        text={
          p === 1
            ? questions[i].staffText
            : p === 4
              ? questions[i].pupilText
              : questions[i].parentText
        }
      />
    )
  }

  return (
    <>
      {questions?.length === 0 ? (
        <h3 className="sub-heading">Let's start building your survey!</h3>
      ) : (
        <>
          {questions?.map((question, i) => (
            <div key={i} value={i} className="create-question">
              {i === index ? renderForm(i) : renderSingleQuestion(i)}
            </div>
          ))}
        </>
      )}
    </>
  )
}
