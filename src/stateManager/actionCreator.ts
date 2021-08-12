import { DispatchModel } from '../types/model';
import { loadQuestionnaires } from '../services/main';

export const ACTIONS = {
  LOAD_QUESTIONNAIRE: 'LOAD_QUESTIONNAIRE',
  JUMP_TO_QUESTION: 'JUMP_TO_QUESTION',
  SUBMIT_ANSWER: 'SUBMIT_ANSWER',
  SAVE_ITEM: 'SAVE_ITEM',
  START_AGAIN: 'START_AGAIN'
}

export const initQuestionnaire = () => {
  return async (dispatch : DispatchModel) => {
    await loadQuestionnaires().then((model) => {
      let questionnaire = model.questionnaire;
      dispatch({ type: ACTIONS.LOAD_QUESTIONNAIRE, payload: questionnaire })
    })
  }
}

export const jumpToQuestion = (questionId: string) => ({ type: ACTIONS.JUMP_TO_QUESTION, payload: questionId })

export const submitAnswer = (questionId: string) => ({ type: ACTIONS.SUBMIT_ANSWER, payload: questionId })

export const saveItem = (questionId: string, value: string | string[]) =>
({
  type: ACTIONS.SAVE_ITEM,
  payload: {
    questionId,
    value
  }
})

export const startAgain = () => ({ type: ACTIONS.START_AGAIN, payload: undefined })