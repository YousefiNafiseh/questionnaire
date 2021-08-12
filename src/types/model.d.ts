export interface AnswersModel {
  questionId: string,
  answer: string | string[],
}

export interface Choices {
  label: string,
  value: string,
  selected: boolean,
}

interface JumpCondition {
  field: string,
  value: string,
}

interface JumpDestination {
  id: string,
}

export interface Jumps {
  conditions: JumpCondition[],
  destination: JumpDestination
}

export interface Questions {
  question_type: 'multiple-choice' | 'text',
  identifier: string,
  headline: string,
  description?: string,
  required: boolean,
  multiple?: string,
  multiline?: 'true' | 'false',
  choices?: Choices[],
  jumps: Jumps[],
}

export interface Questionnaire {
  id: number,
  identifier: string,
  name: string,
  questions: Questions[],
  description: string,
  category_name_hyphenated: string,
}

export interface AppState {
  questionnaire: Questionnaire,
  answers: AnswersModel[],
  questionId: string,
  finished: boolean,
  counter: number
}

export interface ActionModel{
  type: string, 
  payload: unknown
}

type ActionFunction = (dispatch: DispatchModel, getState?: ()=> StateModel) => void;

export type DispatchModel = (action: ActionModel | ActionFunction) => void;
