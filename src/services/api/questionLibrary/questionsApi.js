import request from '../../request'
import {questions} from '../../endpoints'

export default class questionsApi {
  static async post(data) {
    return request({
      url: questions.post(),
      method: 'POST',
      data: data,
    })
  }

  static async get(id) {
    return request({
      url: questions.get(id),
      method: 'GET',
    })
  }
  static async getAll(id) {
    return request({
      url: questions.getAll(id),
      method: 'GET',
    })
  }

  static getBySubCatId(id) {
    return request({
      url: questions.getBySubCatId(id),
      method: 'GET',
    })
  }

  static getListByIds(ids) {
    return request({
      url: questions.getListByIds(),
      method: 'post',
      data: ids,
    })
  }
  static getQuestionsByTagId(id, audience) {
    return request({
      url: questions.getQuestionsByTagId(id, audience),
      method: 'GET',
    })
  }
  static async getQuestionForParticipants(data) {
    return request({
      url: questions.getQuestionForParticipants(),
      method: 'POST',
      data: data,
    })
  }
}
