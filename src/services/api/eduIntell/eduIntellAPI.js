import request from '../../request'
import {eduIntell} from '../../endpoints'

export default class eduIntellAPI {  
  static async GetEDUIntell(userId, userQuery) {
    return request({
      url: eduIntell.GetEDUIntell(userId, userQuery),
      method: 'GET',
    })
  }
}
