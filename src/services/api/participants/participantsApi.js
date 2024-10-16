import request from '../../request'
import {participants} from '../../endpoints'

export default class participantsApi {
  static async getSchoolsByMatId(id) {
    return request({
      url: participants.getSchoolsByMatId(id),
      method: 'GET',
    })
  }
  static async getStudentParent(id) {
    return request({
      url: participants.getStudentParent(),
      method: 'POST',
      data: id,
    })
  }
  static async getStaff(id) {
    return request({
      url: participants.getStaff(),
      method: 'POST',
      data: id,
    })
  }
}
