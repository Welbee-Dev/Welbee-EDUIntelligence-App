import request from '../../request'
import {artifact} from '../../endpoints'

export default class artifactApi {
  static async get(src) {
    return request({
      url: artifact.get(src),
      method: 'GET',
    })
  }
  static async post(data) {
    return request({
      url: artifact.post(),
      method: 'POST',
      data,
      contentType: 'multipart/form-data',
    })
  }
}
