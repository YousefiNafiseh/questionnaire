import { render, cleanup } from '@testing-library/react';
import Card from './index';

afterEach(cleanup);

test('card test', () => {
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