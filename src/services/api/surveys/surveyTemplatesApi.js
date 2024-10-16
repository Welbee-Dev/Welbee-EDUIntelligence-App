import request from '../../request'
import {survey} from '../../endpoints'

export default class surveysApi {
  static async post(data) {
    return request({
      url: survey.surveys(),
      method: 'POST',
      data: data,
    })
  }

  static async put(data) {
    return request({
      url: survey.surveys(),
      method: 'PUT',
      data: data,
    })
  }

  static async get(token) {
    return request({
      url: survey.get(),
      method: 'POST',
      data: token,
    })
  }
  static async getAll(cId, cType, limit) {
    return request({
      url: survey.getAll(cId, cType, limit),
      method: 'GET',
    })
  }
}
