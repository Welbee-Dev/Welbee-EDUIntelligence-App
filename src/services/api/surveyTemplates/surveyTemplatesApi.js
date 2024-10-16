import request from '../../request'
import {surveyTemplates} from '../../endpoints'

export default class surveyTemplatesApi {
  static async get(customerId, customerType) {
    return request({
      url: surveyTemplates.get(customerId, customerType),
      method: 'GET',
    })
  }

  static async copyTemplate(
    customerId,
    customerType,
    templateId,
    anonym,
    shared
  ) {
    return request({
      url: surveyTemplates.copyTemplate(
        customerId,
        customerType,
        templateId,
        anonym,
        shared
      ),
      method: 'GET',
    })
  }
}
