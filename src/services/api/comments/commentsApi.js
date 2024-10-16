import request from '../../request'
import {comments} from '../../endpoints'

export default class commentsApi {
  static async get(surveyId, questionId, schoolId) {
    return request({
      url: comments.get(surveyId, questionId, schoolId),
      method: 'GET',
    })
  }
  static async getCommenterName(id) {
    return request({
      url: comments.getCommenterName(id),
      method: 'GET',
    })
  }

  static async AddCommentReply(comment) {
    return request({
      url: comments.AddCommentReply(),
      method: 'POST',
      data: comment,
    })
  }

  static async GetRepliesByCommentId(id) {
    return request({
      url: comments.GetRepliesByCommentId(id),
      method: 'GET',
    })
  }
}
