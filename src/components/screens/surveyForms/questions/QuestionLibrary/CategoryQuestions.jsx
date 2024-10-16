import React, {useEffect} from 'react'
import questionsApi from '../../../../../services/api/questionLibrary/questionsApi'
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Chip,
  Alert,
  TextField,
} from '@mui/material'
import {
  AddCircleOutline,
  ArrowDownward,
  ArrowRight,
  RemoveCircleOutline,
} from '@mui/icons-material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import surveyQuestionApi from '../../../../../services/api/surveys/surveyQuestionApi'
import WbTextField from '../../../../../components/common/WbTextField'
import WbButton from '../../../../../components/common/WbButton'
import {QUESTION_TYPE} from '../../../../../utils/constants'

export default function CategoryQuestions({
  tag,
  onClose,
  survey,
  surveyQuestions,
  setSurveyQuestions,
}) {
  const [questions, setQuestions] = React.useState([])
  const [selectedQuestions, setSelectedQuestions] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [showAnswers, setShowAnswers] = React.useState(0)
  const [search, setSearch] = React.useState('')

  useEffect(() => {
    setLoading(true)
    questionsApi
      .getQuestionsByTagId(tag.id, survey.audience)
      .then(response => {
        setQuestions([
          ...response.map(q => ({
            ...q,
            questionSettings: q.questionSettings
              ? {...q.questionSettings}
              : null,
            sliderResponseAttributes: q.sliderResponseAttributes
              ? {...q.sliderResponseAttributes}
              : null,
            multiOptionResponseAttributes: q.multiOptionResponseAttributes
              ? [...q.multiOptionResponseAttributes]
              : null,
            followupQuestions: q.followupQuestions
              ? [...q.followupQuestions]
              : null,
            openResponseAttributes: q.openResponseAttributes
              ? {...q.openResponseAttributes}
              : null,
          })),
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const getQuestionTypeName = questionType => {
    switch (questionType) {
      case QUESTION_TYPE.LIKERT:
        return 'Likert'
      case QUESTION_TYPE.COMMENTS:
        return 'Comments'
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return 'Multi Choice'
      case QUESTION_TYPE.MULTIPLE_SELECT:
        return 'Multi Select'
      case QUESTION_TYPE.NUMBER_SLIDER:
        return 'Number Slider'
      case QUESTION_TYPE.YES_NO:
        return 'Yes No'
      case QUESTION_TYPE.YES_NO_MAYBE:
        return 'Yes No Maybe'
      case QUESTION_TYPE.PERCENTAGE:
        return 'Percentage'
      case QUESTION_TYPE.RANKING:
        return 'Ranking'
    }
  }
  const getAllQuestions = () => {
    return (
      <div className="bank-questions">
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ul className="bank-question-box left-column">
              {questions
                // .filter(x =>
                //   search !== null ? x.staffText : x.staffText?.includes(search)
                // )
                .map((question, idx) =>
                  idx % 2 === 0 ? (
                    <li className="questions">
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <h4>
                          {question.staffText
                            ? question.staffText
                            : question.parentText
                              ? question.parentText
                              : question.pupilText}
                        </h4>

                        <div>
                          {selectedQuestions.findIndex(
                            x => x.id === question.id
                          ) === -1 ? (
                            <IconButton
                              disableRipple
                              onClick={e => {
                                if (
                                  selectedQuestions.findIndex(x => {
                                    return x.id === question.id
                                  }) === -1
                                ) {
                                  setSelectedQuestions([
                                    ...selectedQuestions.map(q => ({
                                      ...q,
                                      questionSettings: q.questionSettings,
                                      sliderResponseAttributes:
                                        q.sliderResponseAttributes,
                                      multiOptionResponseAttributes:
                                        q.multiOptionResponseAttributes,
                                      followupQuestions: q.followupQuestions,
                                      openResponseAttributes:
                                        q.openResponseAttributes,
                                    })),
                                    {
                                      ...question,
                                      questionSettings:
                                        question.questionSettings,
                                      sliderResponseAttributes:
                                        question.sliderResponseAttributes,
                                      multiOptionResponseAttributes:
                                        question.multiOptionResponseAttributes,
                                      followupQuestions:
                                        question.followupQuestions,
                                      openResponseAttributes:
                                        question.openResponseAttributes,
                                    },
                                  ])
                                }
                              }}
                            >
                              <AddCircleOutline sx={{fontSize: '20px'}} />
                            </IconButton>
                          ) : (
                            ''
                          )}
                        </div>
                      </Stack>
                      {question.questionType > 3 &&
                        question.questionType < 9 && (
                          <div className="show-hide">
                            <Button
                              disableRipple
                              onClick={e =>
                                setShowAnswers(
                                  showAnswers === question.id ? 0 : question.id
                                )
                              }
                              startIcon={
                                showAnswers === question.id ? (
                                  <ArrowDropDownIcon />
                                ) : (
                                  <ArrowRight />
                                )
                              }
                            >
                              {showAnswers === question.id ? 'Hide' : 'Show'}{' '}
                              Answers
                            </Button>

                            {showAnswers === question.id ? (
                              <ul className="answers">
                                {question.multiOptionResponseAttributes.map(
                                  option => (
                                    <li>{option.staffText}</li>
                                  )
                                )}
                              </ul>
                            ) : null}
                          </div>
                        )}
                      <Chip
                        label={getQuestionTypeName(question.questionType)}
                        size="small"
                      />
                      {/* {getQuestionTypeName(question.questionType)} */}
                    </li>
                  ) : null
                )}
            </ul>

            <ul className="bank-question-box right-column">
              {questions
                // .filter(x =>
                //   search !== null ? x.staffText : x.staffText?.includes(search)
                // )
                .map((question, idx) =>
                  idx % 2 !== 0 ? (
                    <li className="questions">
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <h4>
                          {question.staffText
                            ? question.staffText
                            : question.parentText
                              ? question.parentText
                              : question.pupilText}
                        </h4>

                        <div>
                          {selectedQuestions.findIndex(
                            x => x.id === question.id
                          ) === -1 ? (
                            <IconButton
                              disableRipple
                              onClick={e => {
                                if (
                                  selectedQuestions.findIndex(x => {
                                    return x.id === question.id
                                  }) === -1
                                ) {
                                  setSelectedQuestions([
                                    ...selectedQuestions.map(q => ({
                                      ...q,
                                      questionSettings: q.questionSettings,
                                      sliderResponseAttributes:
                                        q.sliderResponseAttributes,
                                      multiOptionResponseAttributes:
                                        q.multiOptionResponseAttributes,
                                      followupQuestions: q.followupQuestions,
                                      openResponseAttributes:
                                        q.openResponseAttributes,
                                    })),
                                    {
                                      ...question,
                                      questionSettings:
                                        question.questionSettings,
                                      sliderResponseAttributes:
                                        question.sliderResponseAttributes,
                                      multiOptionResponseAttributes:
                                        question.multiOptionResponseAttributes,
                                      followupQuestions:
                                        question.followupQuestions,
                                      openResponseAttributes:
                                        question.openResponseAttributes,
                                    },
                                  ])
                                }
                              }}
                            >
                              <AddCircleOutline sx={{fontSize: '20px'}} />
                            </IconButton>
                          ) : (
                            ''
                          )}
                        </div>
                      </Stack>
                      {question.questionType > 3 &&
                        question.questionType < 9 && (
                          <div className="show-hide">
                            <Button
                              disableRipple
                              onClick={e =>
                                setShowAnswers(
                                  showAnswers === question.id ? 0 : question.id
                                )
                              }
                              startIcon={
                                showAnswers === question.id ? (
                                  <ArrowDropDownIcon />
                                ) : (
                                  <ArrowRight />
                                )
                              }
                            >
                              {showAnswers === question.id ? 'Hide' : 'Show'}{' '}
                              Answers
                            </Button>

                            {showAnswers === question.id ? (
                              <ul className="answers">
                                {question.multiOptionResponseAttributes.map(
                                  option => (
                                    <li>{option.staffText}</li>
                                  )
                                )}
                              </ul>
                            ) : null}
                          </div>
                        )}
                      <Chip
                        label={getQuestionTypeName(question.questionType)}
                        size="small"
                      />
                      {/* {getQuestionTypeName(question.questionType)} */}
                    </li>
                  ) : null
                )}
            </ul>
          </Grid>
        </Grid>
      </div>
    )
  }

  const getSelectedQuestions = (
    selectedQuestions,
    setSelectedQuestions,
    survey,
    setSurvey
  ) => {
    return (
      <div className="selected-questions-container">
        {selectedQuestions?.map(q => {
          return (
            <div className="selected-questions">
              <div>
                {q.staffText
                  ? q.staffText
                  : q.parentText
                    ? q.parentText
                    : q.pupilText}
              </div>
              <div>
                <IconButton
                  onClick={c => {
                    setSelectedQuestions([
                      ...selectedQuestions.filter(x => x.id !== q.id),
                    ])
                  }}
                >
                  <RemoveCircleOutline className="icon-delete" />
                </IconButton>
              </div>
            </div>
          )
        })}
        {selectedQuestions?.length > 0 && (
          <WbButton
            className="selected-questions-button"
            fullWidth
            onClick={e => {
              setSurveyQuestions([
                ...surveyQuestions.map(x => ({
                  ...x,
                  sliderResponseAttributes: x.sliderResponseAttributes,
                  multiOptionResponseAttributes:
                    x.multiOptionResponseAttributes,
                  followupQuestions: x.followupQuestions,
                  questionSettings: x.questionSettings,
                  openResponseAttributes: x.openResponseAttributes,
                })),
                ...selectedQuestions.map((x, pos) => ({
                  ...x,
                  order: x.order + pos + 1,
                  sliderResponseAttributes: x.sliderResponseAttributes,
                  multiOptionResponseAttributes:
                    x.multiOptionResponseAttributes,
                  followupQuestions: x.followupQuestions,
                  questionSettings: x.questionSettings,
                  openResponseAttributes: x.openResponseAttributes,
                })),
              ])

              selectedQuestions.map((q, idx) => {
                surveyQuestionApi
                  .post({
                    surveyId: survey.id,
                    questionId: q.id,
                  })
                  .then(res => {})
              })
              onClose()

              // let surveyQuestions = []
              // selectedQuestions.map((q, idx) => {
              //
              //   surveyQuestions.push({
              //     id: 0,
              //     libraryId: q.id,
              //     surveyId: survey.id,
              //     isCustom: false,
              //     order: survey.surveyQuestions.length + idx,
              //     hasCustomValue: false,
              //     label: q.label,
              //     questionType: q.questionType,
              //     hasDescription:
              //       q.description || q.parentDescription || q.pupilDescription
              //         ? true
              //         : false,
              //     description: q.description,
              //     parentDescription: q.parentDescription,
              //     pupilDescription: q.pupilDescription,
              //     image: '',
              //     pupilLabel: q.pupilLabel,
              //     parentLabel: q.parentLabel,
              //     // options: [
              //     //   ...q.options.map((o, i) => ({
              //     //     id: 0,
              //     //     label: o.label,
              //     //     pupilLabel: o.pupilLabel,
              //     //     parentLabel: o.parentLabel,
              //     //     customValue: null,
              //     //     parentCustomValue: null,
              //     //     pupilCustomValue: null,
              //     //     value: i + 1,
              //     //     order: i + 1,
              //     //   })),
              //     // ],
              //   })
              // })
              // //
              // // surveyQuestionApi
              // //   .addLibraryQuestion(surveyQuestions)
              // //   .then(response => {
              // //
              // //     setSurvey({
              // //       ...survey,
              // //       surveyQuestions: [...survey.surveyQuestions, ...response],
              // //     })
              // //     onClose()
              // //   })
              // //   .finally(() => {})
            }}
            CustomButtonText={'Add ' + selectedQuestions?.length + ' Questions'}
          ></WbButton>
        )}
      </div>
    )
  }

  return (
    <div className="question-bank-container">
      <Grid container>
        <Grid
          item
          lg={8}
          md={8}
          sm={12}
          xs={12}
          borderRight="1px solid #e2e2e2"
        >
          <TextField
            fullWidth
            className="search-txt"
            placeholder="Search question"
            onChange={e => setSearch(e.target.value)}
          ></TextField>

          <div className="total-questions">{questions?.length} Questions</div>
          {loading ? (
            <Backdrop open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : questions.length > 0 ? (
            getAllQuestions()
          ) : (
            <Alert severity="info">
              There are no questions in this category.
            </Alert>
          )}
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12} p={2}>
          <h3>Selected Questions</h3>
          <div>
            {getSelectedQuestions(
              selectedQuestions,
              setSelectedQuestions,
              survey
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
