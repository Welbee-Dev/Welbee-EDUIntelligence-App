import React, {useEffect} from 'react'
import WbModal from '../../../components/common/WbModal'
import tagsApi from '../../../services/api/questionLibrary/tagsApi'
import {AccordionDetails, Stack} from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import CategoryQuestions from '../../../components/screens/surveyForms/questions/QuestionLibrary/CategoryQuestions'

export default function QuestionLibrary({survey, questions, setQuestions}) {
  const [selectedTag, setSelectedTag] = React.useState(null)

  const [tags, setTags] = React.useState([])

  useEffect(() => {
    tagsApi.get().then(res => {
      debugger
      setTags(res)
    })
  }, [])

  return (
    <>
      {tags.map(tag => (
        <AccordionDetails
          onClick={e => setSelectedTag(tag)}
          style={{cursor: 'pointer'}}
        >
          <Stack
            direction={'row'}
            justifyContent="space-between"
            alignContent="center"
          >
            <div>{tag.name}</div>
            <div>
              <ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}} />
            </div>
          </Stack>
        </AccordionDetails>
      ))}

      {selectedTag && (
        <WbModal
          width={'80%'}
          onClose={() => setSelectedTag(null)}
          title={selectedTag.name}
          content={
            <CategoryQuestions
              survey={survey}
              surveyQuestions={questions}
              tag={selectedTag}
              setSurveyQuestions={setQuestions}
              onClose={() => setSelectedTag(null)}
            />
          }
        ></WbModal>
      )}

      {/* {subcat && (
        <WbModal
          width={'80%'}
          onClose={() => setSubCat(null)}
          title={subcat.name}
          content={
            <CategoryQuestions
              survey={survey}
              surveyQuestions={questions}
              subcategory={subcat}
              setSurveyQuestions={setQuestions}
              onClose={() => setSubCat(null)}
            />
          }
        ></WbModal>
      )} */}
    </>
  )
}
