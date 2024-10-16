import request from '../../request'
import {surveyQuestion} from '../../endpoints'

export default class surveyQuestionApi {
  static async addSurveyQuestion(data) {
    return request({
      url: surveyQuestion.addSurveyQuestion(),
      method: 'POST',
      data: data,
    })
  }
  static async addSurveyQuestionRemoveTempId(surveyId, replaceQdId, newQid) {
    return request({
      url: surveyQuestion.addSurveyQuestionRemoveTempId(
        surveyId,
        replaceQdId,
        newQid
      ),
      method: 'GET',
    })
  }
  static async post(data) {
    return request({
      url: surveyQuestion.post(),
      method: 'POST',
      data: data,
    })
  }

  static async put(data) {
    return request({
      url: surveyQuestion.put(),
      method: 'PUT',
      data: data,
    })
  }

  static async getByToken(token) {
    return request({
      url: surveyQuestion.getByToken(),
      method: 'POST',
      data: token,
    })
  }

  static async delete(surveyId, questionId) {
    return request({
      url: surveyQuestion.delete(questionId, surveyId),
      method: 'DELETE',
    })
  }
  //   static async getAll(cId, cType, limit) {
  //     return request({
  //       url: survey.getAll(cId, cType, limit),
  //       method: 'GET',
  //     })
  //   }
}
