import {QUESTION_TYPE} from './constants'

export default function getQuestionTemplate(questionType) {
  switch (questionType) {
    case QUESTION_TYPE.PERCENTAGE: {
      return {
        ...QUESTION_Library_TEMPLATE,
        questionType: QUESTION_TYPE.PERCENTAGE,
        questionSettings: {
          ...OPTION_SETTINGS,
        },
        sliderResponseAttributes: {
          ...NUMBER_SLIDER_TEMPLATE,
          rangeFrom: 0,
          rangeTo: 100,
        },
        followupQuestions: [
          {
            ...FOLLOWUP_QUESTION_TEMPLATE,
          },
        ],
      }
    }

    case QUESTION_TYPE.NUMBER_SLIDER: {
      return {
        ...QUESTION_Library_TEMPLATE,
        questionType: QUESTION_TYPE.NUMBER_SLIDER,
        questionSettings: {
          ...OPTION_SETTINGS,
        },
        sliderResponseAttributes: {
          ...NUMBER_SLIDER_TEMPLATE,
        },
        followupQuestions: [
          {
            ...FOLLOWUP_QUESTION_TEMPLATE,
          },
        ],
      }
    }

    case QUESTION_TYPE.RANKING: {
      return {
        ...QUESTION_Library_TEMPLATE,
        questionType: QUESTION_TYPE.RANKING,
        questionSettings: {
          ...OPTION_SETTINGS,
        },
        followupQuestions: [],
        multiOptionResponseAttributes: [
          {
            value: 1,
            staffText: 'Anwser 1',
            pupilText: 'Anwser 1',
            parentText: 'Anwser 1',
            order: 1,
            numValue: 1,
          },
          {
            value: 2,
            staffText: 'Anwser 2',
            pupilText: 'Anwser 2',
            parentText: 'Anwser 2',
            order: 2,
            numValue: 2,
          },
        ],
      }
    }
    case QUESTION_TYPE.COMMENTS: {
      return {
        ...QUESTION_Library_TEMPLATE,
        questionType: QUESTION_TYPE.COMMENTS,
        questionSettings: {
          ...OPTION_SETTINGS,
        },
        openResponseAttributes: {...COMMENT_TEMPLATE},
      }
    }
    case QUESTION_TYPE.YES_NO: {
      return {
        ...QUESTION_Library_TEMPLATE,
        questionType: QUESTION_TYPE.YES_NO,
        questionSettings: {
          ...OPTION_SETTINGS,
        },
        followupQuestions: [],
        multiOptionResponseAttributes: [
          {
            value: 1,
            staffText: 'Yes',
            pupilText: 'Yes',
            parentText: 'Yes',
            order: 1,
            numValue: 1,
          },
          {
            value: 2,
            staffText: 'No',
            pupilText: 'No',
            parentText: 'No',
            order: 2,
            numValue: 2,
          },
        ],
      }
    }

    case QUESTION_TYPE.YES_NO_MAYBE: {
      return {
        ...QUESTION_Library_TEMPLATE,
        questionType: QUESTION_TYPE.YES_NO_MAYBE,
        questionSettings: {
          ...OPTION_SETTINGS,
        },
        followupQuestions: [],
        multiOptionResponseAttributes: [
          {
            value: 1,
            staffText: 'Yes',
            pupilText: 'Yes',
            parentText: 'Yes',
            order: 1,
            numValue: 1,
          },
          {
            value: 2,
            staffText: 'No',
            pupilText: 'No',
            parentText: 'No',
            order: 2,
            numValue: 2,
          },
          {
            value: 3,
            staffText: 'Maybe',
            pupilText: 'Maybe',
            parentText: 'Maybe',
            order: 3,
            numValue: 3,
          },
        ],
      }
    }

    case QUESTION_TYPE.MULTIPLE_SELECT: {
      return {
        ...QUESTION_Library_TEMPLATE,
        questionType: QUESTION_TYPE.MULTIPLE_SELECT,
        questionSettings: {
          ...OPTION_SETTINGS,
          multiSelectOperator: 2,
          multiSelectValue: 2,
        },
        followupQuestions: [],
        multiOptionResponseAttributes: [
          {
            value: 1,
            staffText: 'Anwser 1',
            pupilText: 'Anwser 1',
            parentText: 'Anwser 1',
            order: 1,
            numValue: 1,
          },
          {
            value: 2,
            staffText: 'Anwser 2',
            pupilText: 'Anwser 2',
            parentText: 'Anwser 2',
            order: 2,
            numValue: 2,
          },
        ],
      }
    }
    case QUESTION_TYPE.LIKERT:
    case QUESTION_TYPE.MULTIPLE_CHOICE: {
      return {
        ...QUESTION_Library_TEMPLATE,
        questionType:
          questionType === QUESTION_TYPE.MULTIPLE_CHOICE
            ? QUESTION_TYPE.MULTIPLE_CHOICE
            : QUESTION_TYPE.LIKERT,
        questionSettings: {
          ...OPTION_SETTINGS,
        },
        followupQuestions: [],
        multiOptionResponseAttributes: [
          {
            value: 1,
            staffText: 'Anwser 1',
            pupilText: 'Anwser 1',
            parentText: 'Anwser 1',
            order: 1,
            numValue: 1,
          },
          {
            value: 2,
            staffText: 'Anwser 2',
            pupilText: 'Anwser 2',
            parentText: 'Anwser 2',
            order: 2,
            numValue: 2,
          },
        ],
      }
    }
    default:
      return {...QUESTION_Library_TEMPLATE}
  }
}

const QUESTION_Library_TEMPLATE = {
  id: 0,
  isAdmin: false,
  staffText: null,
  pupilText: null,
  parentText: null,
  staffDescription: null,
  pupilDescription: null,
  parentDescription: null,
  image: null,
  hasCustomValue: true,
  hasFollowup: false,
  audiences: [],
  isEditable: true,
}
const OPTION_SETTINGS = {
  id: 0,
  multiSelectOperator: 1,
  multiSelectValue: 1,
  isRequired: true,
}
const FOLLOWUP_QUESTION_TEMPLATE = {
  id: 0,
  followupValue: null,
  followupValueOperator: null,
  staffFollowupText: null,
  pupilFollowupText: null,
  parentFollowupText: null,
}
const MULTIPLE_RESPONSE_TEMPLATE = {
  id: 0,
  staffText: null,
  pupilText: null,
  parentText: null,
  value: 1,
  numValue: 1,
  order: 1,
}

const NUMBER_SLIDER_TEMPLATE = {
  id: 0,
  rangeFrom: 0,
  rangeTo: 10,
  staffHighScaleLabel: '',
  staffMidScaleLabel: '',
  staffLowScaleLabel: '',
  parentHighScaleLabel: '',
  parentMidScaleLabel: '',
  parentLowScaleLabel: '',
  pupilHighScaleLabel: '',
  pupilMidScaleLabel: '',
  pupilLowScaleLabel: '',
}

const COMMENT_TEMPLATE = {
  id: 0,
  hasCharacterLimit: false,
  minCharacterLimit: 1,
  maxCharacterLimit: 1000,
}
