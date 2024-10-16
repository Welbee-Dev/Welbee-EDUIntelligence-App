import request from '../../request'
import {surveytag} from '../../endpoints'

export default class surveyTagsApi {
  static async post(data) {
    return request({
      url: surveytag.surveyTags(),
      method: 'POST',
      data: data,
    })
  }

  static async get(id, ctype) {
    return request({
      url: surveytag.surveyTags(id, ctype),
      method: 'GET',
    })
  }
}
