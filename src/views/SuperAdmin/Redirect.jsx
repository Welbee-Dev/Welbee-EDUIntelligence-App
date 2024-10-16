import {CircularProgress} from '@mui/material'
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {CUSTOMER_TYPE} from '../../utils/constants'

export default function Redirect() {
  const navigate = useNavigate()
  const urlParams = window.location.search.split('?')[1].split('&')

  useEffect(() => {
    debugger

    const isMatOrg = urlParams[3].split('=')[1] === 'true'
    const name = atob(urlParams[0].split('=')[1])
    const email = atob(urlParams[1].split('=')[1])
    const ismat = isMatOrg
    const access_token = urlParams[4].split('=')[1]
    const id = parseInt(urlParams[2].split('=')[1])
    let firstName = urlParams[5].split('=')[1]
    let lastName = urlParams[6].split('=')[1]

    if (firstName === 'null' && lastName === 'null') {
      firstName = 'Super'
      lastName = 'Admin'
    }

    let customer = {
      id: id,
      name: name,
      customerType: ismat ? CUSTOMER_TYPE.MAT : CUSTOMER_TYPE.School,
    }

    let user = {
      name: firstName + ' ' + lastName,
      isMat: ismat,
      email: email,
    }
    localStorage.setItem('token', access_token)
    localStorage.setItem('customer', JSON.stringify(customer))
    localStorage.setItem('user', JSON.stringify(user))

    navigate(`/`)
  }, [])
  return <CircularProgress />
}
