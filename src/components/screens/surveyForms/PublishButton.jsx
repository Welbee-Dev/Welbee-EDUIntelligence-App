import React, {useEffect, useState} from 'react'
import {schedulerApi} from '../../../services'
import {useNavigate, useParams} from 'react-router-dom'
import WbButton from '../../common/WbButton'
import WbAlert from '../../common/WbAlert'
import paths from '../../../routes/paths'

export default function PublishButton() {
  const navigate = useNavigate()
  const token = useParams().token
  const [canPulish, setCanPublish] = useState(false)

  useEffect(() => {
    schedulerApi.canPublish(token).then(res => setCanPublish(res))
  }, [])

  return canPulish ? (
    <WbButton
      CustomButtonText={'Publish'}
      onClick={() => {
        schedulerApi.publish(token).then(res => {
          WbAlert({message: 'Survey Published Successfully', type: 'success'})
          navigate(paths.dashboard)
        })
      }}
    />
  ) : (
    ''
  )
}
