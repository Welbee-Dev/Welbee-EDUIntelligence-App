import {Stack, TextField} from '@mui/material'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import {styled} from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import React, {useEffect} from 'react'
import {categoriesApi, surveysApi, surveyTagsApi} from '../../../../../services'
import subCategoriesApi from '../../../../../services/api/questionLibrary/subCategoriesApi'
import useCustomerData from '../../../../../hooks/useCustomerData'

const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderLeft: 0,
  borderRight: 0,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}))

const AccordionSummary = styled(props => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}} />}
    {...props}
  />
))(({theme}) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}))

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default function QuestionCategoriesList({showQuestion}) {
  const [search, setSearch] = React.useState('')
  const [tags1, setTags1] = React.useState([])
  const [tags2, setTags2] = React.useState([])
  const [selectedTag, setSelectedTag] = React.useState(null)
  const [subtags1, setSubTags1] = React.useState([])
  const [subtags2, setSubTags2] = React.useState([])

  const customer = useCustomerData()

  useEffect(() => {
    surveyTagsApi.get(customer.id, customer.customerType).then(response => {
      let list = []
      response.map(tag => {
        list.push({id: tag.id, name: tag.tag, type: 2})
      })
      setTags2(list)
    })
    categoriesApi.get().then(response => {
      let list = []
      response.map(category => {
        list.push({id: category.id, name: category.name, type: 1})
      })
      setTags1(list)
    })
    subCategoriesApi.get().then(response => {
      //setSubCategories(response)
      let list = []
      response.map(subcategory => {
        list.push({
          id: subcategory.id,
          name: subcategory.name,
          questionCategoryId: subcategory.questionCategoryId,
          type: 1,
        })
      })
      setSubTags1(list)
    })
    surveysApi
      .getAll(customer.id, customer.customerType, 1000)
      .then(response => {
        let list = []
        response.map(survey => {
          list.push({
            id: survey.token,
            name: survey.name,
            type: 2,
            tags: survey.surveysTags,
          })
        })
        setSubTags2(list)
      })
  }, [])

  return (
    <>
      <TextField
        fullWidth
        className="search-txt"
        value={search}
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
      ></TextField>
      {[...tags2, ...tags1]?.map(label => (
        <Accordion
          expanded={
            label.type == 2
              ? label.id === selectedTag?.id
              : label.id === selectedTag?.id
          }
          onChange={e => setSelectedTag(label)}
          slots={{transition: 'Fade'}}
          sx={{
            '& .MuiAccordion-region': {
              height:
                label.id === selectedTag?.id && label.type === selectedTag.type
                  ? 'auto'
                  : 0,
            },
            '& .MuiAccordionDetails-root': {
              display:
                label.id === selectedTag?.id && label.type === selectedTag.type
                  ? 'block'
                  : 'none',
            },
          }}
        >
          <AccordionSummary>{label.name}</AccordionSummary>
          {[...subtags1, ...subtags2]
            .filter(
              x =>
                (x.type === 2
                  ? x.tags?.includes(label.name)
                  : x.questionCategoryId === label.id) &&
                x.type === label.type &&
                x.name.toLowerCase().includes(search.toLowerCase())
            )
            .map(subcategory => (
              <AccordionDetails
                onClick={e => showQuestion(subcategory)}
                style={{cursor: 'pointer'}}
              >
                <Stack
                  direction={'row'}
                  justifyContent="space-between"
                  alignContent="center"
                >
                  <div>{subcategory.name}</div>
                  <div>
                    <ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}} />
                  </div>
                </Stack>
              </AccordionDetails>
            ))}
        </Accordion>
      ))}
    </>
  )
}
