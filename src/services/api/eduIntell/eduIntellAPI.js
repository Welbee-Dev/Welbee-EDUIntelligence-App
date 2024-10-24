import request from '../../request'
import {eduIntell} from '../../endpoints'

export default class eduIntellAPI {  
  static async GetEDUIntell(surveyId,userId, userQuery, requestType) {
    return request({
      url: eduIntell.GetEDUIntell(surveyId,userId, userQuery,requestType),
      method: 'GET',
    })
  }
}
