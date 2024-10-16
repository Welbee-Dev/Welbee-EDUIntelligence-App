import request from '../../request'
import {scheduler} from '../../endpoints'

export default class schedulerApi {
  static async canPublish(data) {
    return request({
      url: scheduler.canPublish(),
      method: 'POST',
      data: data,
    })
  }

  static async publish(data) {
    return request({
      url: scheduler.publish(),
      method: 'POST',
      data: data,
    })
  }
}
