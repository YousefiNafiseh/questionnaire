import { AppState, Questions } from '../types/model';
import { ACTIONS } from './actionCreator';

interface ActionModel {
  type: string,
  payload: any,
}

export const INIT_STATE: AppState = {
  questionnaire: {
    id: 0,
    identifier: '',
    name: '',
    questions: [],
    description: '',
    category_name_hyphenated: ''
  },
  answers: [],
  questionId: '',
  finished: false,
  questionnaireNumber: 0,
  showRequiredMessage: false,
}

export function reducer(state: AppState, action: ActionModel) {
  return (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload)
}

const ACTION_HANDLERS = {
  [ACTIONS.LOAD_QUESTIONNAIRE]: handleLoadQuestionnaire,
  [ACTIONS.JUMP_TO_QUESTION]: handleJumpToQuestion,
  [ACTIONS.SUBMIT_ANSWER]: handleSubmitAnswer,
  [ACTIONS.SAVE_ITEM]: handleSaveItem,
  [ACTIONS.START_AGAIN]: handleStartAgain,
}

function handleLoadQuestionnaire(state: AppState, payload: any) {
  return {
    ...state,
    questionnaire: payload,    
  }
}

function handleJumpToQuestion(state: AppState, payload: any) {
  let question = state.questionnaire.questions.find(question => question.identifier === state.questionId)
  if(!!checkQuestionRequirement(question!))
  {
    return handleShowRequiredMessage(state)
  }
  return {
    ...state,
    questionId: payload,
    showRequiredMessage: false
  }
}

function handleShowRequiredMessage(state: AppState) {
  return {
    ...state,
    showRequiredMessage: true
  }
}

function checkQuestionRequirement(question: Questions) {
  if (question?.required) {
    let showMessage = false;
    if (question.question_type === 'multiple-choice') {
      showMessage = !question.choices?.some(choice => choice.selected === true);
    }
    else {
      showMessage = !(!!question.description && question.description.length > 0);
    }
    return showMessage;
  }
  return false;
}

function handleSubmitAnswer(state: AppState, payload: any) {
  let question = state.questionnaire.questions.find(question => question.identifier === payload)
  if(!!checkQuestionRequirement(question!))
  {
    return handleShowRequiredMessage(state)
  }
  let nextQuestionId = '';
  if(!!question?.jumps && question?.jumps.length > 0)
  {
    let selectedAnswers = question?.choices?.filter(choice => choice.selected === true);
    for(let jump of question.jumps)
    {
      if(selectedAnswers?.some(x => jump.conditions.findIndex(condition => condition.value === x.value) > -1 ))
      {
        nextQuestionId = jump.destination.id
        break;
      }
    }
  }
  else {
    let currentQuestionIndex = state.questionnaire.questions.findIndex(question => question.identifier === payload);
    if(currentQuestionIndex < state.questionnaire.questions.length - 1)
    {
      nextQuestionId = state.questionnaire.questions[currentQuestionIndex + 1].identifier;
    }
    else
    {
      return {
        ...state,
        finished: true,
        showRequiredMessage: false
      }
    }
  }
  return handleJumpToQuestion(state, nextQuestionId)
}

function handleSaveItem(state: AppState, payload: any) {
  let question = state.questionnaire.questions.find(question => question.identifier === state.questionId)
  if(question?.question_type === 'multiple-choice')
  {
    if(question?.multiple === 'true')
    {
      let answer = question?.choices?.find(x => x.value === payload.value);
      answer!.selected = !answer?.selected;

      let answerIndex = question?.choices?.findIndex(x => x.value === payload.value);
      question!.choices!.splice(answerIndex!, 1, answer!);
    }
    else
    {
      question?.choices?.forEach((choice) => {
        choice.selected = (choice.value === payload.value) ? true : false;
      })
    }
  }
  else {
    question!.description = payload.value
  }

  let questionIndex = state.questionnaire.questions.findIndex(question => question.identifier === state.questionId)
  let questionanaire = {...state.questionnaire}
  questionanaire.questions.splice(questionIndex, 1 , question!);
  
  return {
    ...state,
    questionnaire: questionanaire
  }
}  

function handleStartAgain(state: AppState) {
  return {
    ...state,
    finished: false,
    loading: true,
    questionId: '',
    questionnaireNumber: state.questionnaireNumber + 1
  }
}