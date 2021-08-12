import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider as DispatchProvider } from '../../context/dispatcherContext'
import { Provider as AppStateProvider } from '../../context/appStateContext'
import Card from './index';
import { INIT_STATE } from '../../stateManager/reducer';

afterEach(cleanup);

describe('car', () => {
  test('should render succesfully', () => {
    const { getByTestId } = render(
      <Card />
    )

    const cardTitle = getByTestId('cardTitle');
    const cardDescription = getByTestId('cardDescription');
    const answerQuestionBtn = getByTestId('answerQuestionBtn');

    expect(cardTitle).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
    expect(answerQuestionBtn).toBeInTheDocument();
  })

  it('should dispatch "" when user clicks "Answer Question".', () => {
    const stateMock = {
      ...INIT_STATE,
      questionnaire: {
        ...INIT_STATE.questionnaire,
        questions: [{
          question_type: 'text',
          identifier: 'i',
          headline: 'head',
          description: 'desc',
          required: true,
          multiple: 'false',
          multiline: 'false',
          choices: [],
          jumps: [],
        }]
      }
    };
    const dispatch = jest.fn();
    const { getByTestId } = render(
      <DispatchProvider dispatch={dispatch}>
        <AppStateProvider state={stateMock}>
          <Card />
        </AppStateProvider>
      </DispatchProvider>
    );

    const button = getByTestId('answerQuestionBtn');
    fireEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'JUMP_TO_QUESTION', payload: 'i'
    })
  })
})