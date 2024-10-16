import request from '../../request'
import {groupCycles} from '../../endpoints'

export default class groupCyclesApi {
  static async post(data) {
    return request({
      url: groupCycles.post(),
      method: 'POST',
      data: data,
    })
  }

  static async getBySurveyToken(token) {
    return request({
      url: groupCycles.getBySurveyToken(),
      method: 'POST',
      data: token,
    })
  }
}
