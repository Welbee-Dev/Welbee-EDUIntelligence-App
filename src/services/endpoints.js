//////////survey  api

const survey = {
  surveys: () => `/survey`,
  get: () => `/survey/GetByToken`,
  getAll: (cId, cType, limit) =>
    `/survey/GetAll?customerId=${cId}&customerType=${cType}&limit=${limit}`,
  submit: () => `/survey/SubmitSurvey`,
  updateParticipants: () => `/survey/UpdateParticipants`,
  getSurveyForResults: (schoolId, matId) =>
    `/survey/getSurveyForResults?schoolId=${schoolId}&matId=${matId}`,
}



const scheduler = {
  canPublish: () => `/Scheduler/CanPublish`,
  publish: () => `/Scheduler/Publish`,
}

const surveytag = {
  surveyTags: (id, ctype) => `/surveytag?id=${id}&customertype=${ctype}`,
}

const artifact = {
  get: src => `/Artifact/download?fileName=${src}`,
  post: () => `/Artifact`,
}
const surveyQuestion = {
  post: () => `/surveyquestion`,
  put: () => `/surveyquestion`,
  delete: (id, surveyId) => `/surveyquestion?id=${id}&&surveyId=${surveyId}`,
  get: id => `/surveyquestion?id=${id}`,
  getByToken: () => `/surveyquestion/GetSurveyQuestionsBySurveyToken`,
  addSurveyQuestion: () => `/surveyquestion/AddSurveyQuestion`,
  addSurveyQuestionRemoveTempId: (surveyId, replaceQdId, newQid) =>
    `/surveyquestion/AddSurveyQuestionRemoveTempId?surveyId=${surveyId}&replaceQdId=${replaceQdId}&newQid=${newQid}`,
}

const participants = {
  getSchoolsByMatId: matId => `/Participants/GetMatSchools?id=${matId}`,
  getStudentParent: () => 'Participants/GetStudentParantFromPm',
  getStaff: () => 'Participants/GetStaffFromPm',
}

const groupCycles = {
  post: () => `/groupCycle`,
  getBySurveyToken: () => `/groupCycle/getBySurveyToken`,
}

const categories = {
  post: () => `/category`,
  get: () => `/category`,
}

const subcategory = {
  post: () => `/subcategory`,
  get: () => `/subcategory`,
}

const questions = {
  post: () => `/questions`,
  get: id => `/questions?id=${id}`,
  getBySubCatId: id => `/questions/getBySubCatId?id=${id}`,
  getQuestionForParticipants: () =>
    `/surveyquestion/GetSurveyQuestionByParticipantToken`,
  getListByIds: () => `/questions/GetListByIds`,
  getAll: id => `/questions/getAll`,
  getQuestionsByTagId: (tagId, audience) =>
    `/questions/GetQuestionsByTagId?tagId=${tagId}&audience=${audience}`,
}

const surveyTemplates = {
  get: (customerId, customerType) =>
    `/surveytemplates?id=${customerId}&customerType=${customerType}`,

  copyTemplate: (customerId, customerType, templateId, anonym, shared) =>
    `/surveytemplates/CopyTemplate?id=${customerId}&customerType=${customerType}&templateId=${templateId}&anonym=${anonym}&shared=${shared}`,
}

const comments = {
  get: (surveyId, questionId, schoolId) =>
    `/SurveyComments?surveyId=${surveyId}&questionId=${questionId}&schoolId=${schoolId}`,
  getCommenterName: id => `/SurveyComments/GetCommenterName?id=${id}`,
  AddCommentReply: () => `/SurveyComments/AddCommentReply`,
  GetRepliesByCommentId: id => `/SurveyComments/GetRepliesByCommentId?id=${id}`,
}

const eduIntell = {  
  GetEDUIntell: (userId, userQuery) => `/EDUIntell/GetEDUIntell?userId=${userId}&userQuery=${userQuery}`,
}

const tags = {
  get: () => `/tags`,
}

export {
  artifact,
  comments,
  groupCycles,
  participants,
  questions,
  scheduler,
  survey,
  eduIntell,
  surveyQuestion,
  surveytag,
  surveyTemplates,
  tags,
}
