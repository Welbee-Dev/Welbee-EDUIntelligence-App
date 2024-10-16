import axios from 'axios'
import {Config} from '../utils/Config'
import {isEmpty} from 'lodash'

const getToken = () => {
  const token = localStorage.getItem('token')

  return token ? `Bearer ${token}` : null
}

const clientForm = axios.create({
  responseType: 'json',
  baseURL: Config.BASE_URL,
  transformResponse: response => response,
})

clientForm.defaults.headers.post['Content-Type'] = 'multipart/form-data'
clientForm.defaults.headers.post.Accept = 'application/json'
clientForm.defaults.headers.pragma = 'no-cache'
clientForm.defaults.withCredentials = false
clientForm.defaults.timeout = 120000

const client = axios.create({
  responseType: 'json',
  baseURL: Config.BASE_URL,
  transformResponse: response => response,
})

client.defaults.headers.post['Content-Type'] = 'application/json'
client.defaults.headers.post.Accept = 'application/json'
client.defaults.headers.pragma = 'no-cache'
client.defaults.withCredentials = false
client.defaults.timeout = 120000

const request = options => {
   var token = getToken()

   if (token) {
     client.defaults.headers.common.Authorization = token
   } else {
     delete client.defaults.headers.common.Authorization
   }

  const onSuccess = response => {
    if (typeof response.data === 'string') return JSON.parse(response.data)
    else return response.data
  }

  const onFailure = error => {
    const {response, status, message, headers, data} = error
    const UN_AUTHORIZED = 401
    const FORBIDDEN = 403
    if (
      (response &&
        (response.status === UN_AUTHORIZED || response.status === FORBIDDEN)) ||
      status === UN_AUTHORIZED ||
      status === FORBIDDEN
    ) {
      console.error('status:', status)
      console.error('data:', data)
      console.error('headers:', headers)
      // will call logout function here
      window.location = '/login'
    } else {
      console.error('error message', message)
      if (isEmpty(response)) {
        var errorResponse = {message, success: false}
        return Promise.reject(errorResponse)
      }
    }

    return Promise.reject(JSON.parse(response.data) || JSON.parse(message))
  }
  if (options.contentType) {
    return clientForm(options).then(onSuccess).catch(onFailure)
  }

  return client(options).then(onSuccess).catch(onFailure)
}

export default request
