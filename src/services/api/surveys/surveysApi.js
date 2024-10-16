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

  static async submit(obj) {
    return request({
      url: survey.submit(),
      method: 'POST',
      data: JSON.stringify(obj),
    })
  }

  static async updateParticipants(token, filters) {
    return request({
      url: survey.updateParticipants(),
      method: 'POST',
      data: JSON.stringify({
        token: token,
        participantFilter: JSON.stringify(filters),
      }),
    })
  }

  static async getSurveyForResults(schoolId, matId) {
    return request({
      url: survey.getSurveyForResults(schoolId, matId),
      method: 'GET',
    })
  }
}
