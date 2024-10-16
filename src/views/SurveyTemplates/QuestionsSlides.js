import {Stack} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useFetcher, useLocation} from 'react-router-dom'
import {QUESTION_TYPE} from '../../utils/constants'
import PercentageQuestionRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/PercentageQuestionRender'
import NumberSliderRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/NumberSliderRender'
import RankingQuestionRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/RankingQuestionRander'
import TextQuestionRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/TextQuestionRender'
import MultipleOptionRender from '../../components/screens/surveyForms/questions/QuestionTypeComponents/MultipleOptionRender'
import WbButton from '../../components/common/WbButton'
import IconButton from '@mui/material/IconButton'
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp'
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp'
import WbOutlineButton from '../../components/common/WbOutlineButton'
import surveyQuestionApi from '../../services/api/surveys/surveyQuestionApi'

export default function QuestionsSlides({template}) {
  const [sel, setSel] = useState(0)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    surveyQuestionApi.getByToken(template.token).then(res => {
      setQuestions(res)
    })
  }, [])
  const getPreview = (templateQuestion, tab) => {
    const question = {
      ...templateQuestion,
      questionSettings: {...templateQuestion.questionSettings},
      followupQuestions:
        templateQuestion.followupQuestions?.length > 0
          ? [...templateQuestion.followupQuestions]
          : null,
      multiOptionResponseAttributes:
        templateQuestion.multiOptionResponseAttributes?.length > 0
          ? [...templateQuestion.multiOptionResponseAttributes]
          : null,
      sliderResponseAttributes: {...templateQuestion.sliderResponseAttributes},
      openResponseAttributes: {...templateQuestion.openResponseAttributes},
    }
    switch (question.questionType) {
      case QUESTION_TYPE.MULTIPLE_SELECT:
      case QUESTION_TYPE.YES_NO:
      case QUESTION_TYPE.YES_NO_MAYBE:
        return <MultipleOptionRender question={{...question}} audience={tab} />
      case QUESTION_TYPE.COMMENTS:
        return <TextQuestionRender question={{...question}} audience={tab} />
      case QUESTION_TYPE.RANKING:
        return <RankingQuestionRender question={{...question}} audience={tab} />
      case QUESTION_TYPE.NUMBER_SLIDER:
        return <NumberSliderRender question={{...question}} audience={tab} />
      case QUESTION_TYPE.PERCENTAGE:
        return (
          <PercentageQuestionRender question={{...question}} audience={tab} />
        )
      // case QUESTION_TYPE.SINGLE_CHOICE:
      //   return <SingleChoiceRender question={{...question}} audience={tab} />
      default:
        return <div>Question type not availdasable {question.questionType}</div>
    }
  }
  return (
    <div className="question-type-slides">
      {questions?.map((q, i) => (
        <div
          className="slides"
          style={{
            //transition: 'all 0.75s',
            visibility: i === sel ? 'visible' : 'hidden',
            //transform: `translateX(${i === sel ? 0 : 100}%)`,
            opacity: i === sel ? 1 : 0,
          }}
        >
          <div className="question-slider">{getPreview(q, 1)}</div>
          <div className="slider-btn">
            {sel === 0 ? (
              ''
            ) : (
              <div className="prev-btn">
                <IconButton
                  disableRipple={true}
                  onClick={() => setSel(sel - 1)}
                  //CustomOutlineButtonText={'Previous'}
                >
                  <ChevronLeftSharpIcon />
                </IconButton>
              </div>
            )}
            {sel >= questions?.length - 1 ? (
              ''
            ) : (
              <div className="next-btn">
                <IconButton
                  disableRipple={true}
                  onClick={() => setSel(sel + 1)}
                  //CustomButtonText={'Next'}
                >
                  <ChevronRightSharpIcon />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
