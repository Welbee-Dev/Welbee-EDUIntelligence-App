import React from 'react'
import WbButton from '../../components/common/WbButton'

export default function WelcomeScreen({setSurveyStart}) {
  return (
    <div className="welcome">
      <h1>Welcome to the survey</h1>
      <p>
        The survey is designed to help us understand your experience with the
        product.<br/>Please answer the questions as honestly as possible.
      </p>
      <WbButton
        onClick={() => {
          setSurveyStart(true)
        }}
        CustomButtonText={'Start Survey'}
      ></WbButton>
    </div>
  )
}
