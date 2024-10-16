import * as React from 'react'
import PropTypes from 'prop-types'
import Slider, {SliderThumb} from '@mui/material/Slider'
import {styled} from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'

function ValueLabelComponent(props) {
  const {children, value} = props

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  )
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
}

const CustomSlider = styled(Slider)({
  color: '#007A7A',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#007A7A',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': {display: 'none'},
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})

export default function WbSlider({...props}) {
  return (
    <CustomSlider
      valueLabelDisplay="auto"
      aria-label="custom slider"
      {...props}
    />
  )
}
