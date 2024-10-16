import React, {useState} from 'react'
import {ToggleButtonGroup, ToggleButton, Stack} from '@mui/material'
import WbOutlineButton from '../../common/WbOutlineButton'
import WbButton from '../../common/WbButton'
import WbAlert from '../../common/WbAlert'
import AddIcon from '@mui/icons-material/Add';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';

const SURVEY_TYPES = [
  {
    image: <AddIcon sx={{color: '#53B5E0'}}/>,
    value: 'scratch',
    title: 'Start from scratch',
    subtitle: 'Craft and design your unique survey',
  },
  {
    image: <GridViewSharpIcon sx={{color: '#FFB205'}}/>,
    value: 'template',
    title: 'Use a template',
    subtitle: 'Select a template or re-use a previous survey',
  },
]

const SurveyType = ({onTemplateSelect, onCancel, onPrevious}) => {
  const [selected, setSelected] = useState(null)

  const createToggleButton = (image, value, title, subtitle) => {
    return (
      <ToggleButton value={value} className='survey-selection' disableRipple>        
        {image}
        <h3>{title}</h3>
        <h5>{subtitle}</h5>        
      </ToggleButton>
    )
  }

  return (
    <>
      <Stack direction='row' mt={4} justifyContent='center' >
        <ToggleButtonGroup
          exclusive
          value={selected}
          onChange={(e, val) => setSelected(val)}
        >
          {SURVEY_TYPES.map(surveyType =>
            createToggleButton(              
              surveyType.image,
              surveyType.value,
              surveyType.title,
              surveyType.subtitle
            )
          )}
        </ToggleButtonGroup>
      </Stack>

      <Stack direction="row" justifyContent="space-between" mt={6}>
        <WbOutlineButton
          CustomOutlineButtonText={'Previous'}
          onClick={onPrevious}
        ></WbOutlineButton>
        <Stack direction="row" spacing={1}>        
          <WbOutlineButton
            CustomOutlineButtonText={'Cancel'}
            onClick={onCancel}
          ></WbOutlineButton>
          <WbButton
            CustomButtonText={'Continue'}
            onClick={() => {
              if (!selected) {
                WbAlert({
                  message: 'Please select where to start from.',
                  type: 'error',
                })
                return
              }
              onTemplateSelect(selected)
            }}
          ></WbButton>
          </Stack>
        </Stack>
    </>
  )
}

export default SurveyType
