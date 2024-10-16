import request from '../../request'
import {tags} from '../../endpoints'

export default class tagsApi {
  static async get() {
    return request({
      url: tags.get(),
      method: 'GET',
    })
  }
}
