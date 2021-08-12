import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup
} from 'react-bootstrap';

import styled from 'styled-components';
import { useAppState } from '../../context/appStateContext';
import { useDispatch } from '../../context/dispatcherContext';
import { jumpToQuestion } from '../../stateManager/actionCreator';
import MultipleChoice from './components/multipleChoice';
import Text from './components/text';

const ButtonContainer = styled(ButtonGroup)`
  float:right;
  margin-right:20px;
  position: absolute;
  right:0;
  bottom:10px;
`;

export default function Questions() {
  const state = useAppState();
  const dispatch = useDispatch();

  const findCurrentQuestionIndex = ()=>{
    return state.questionnaire.questions.findIndex(question => question.identifier === state.questionId);
  }

  const findCurrentQuestion = ()=>{
    return state.questionnaire.questions.find(question => question.identifier === state.questionId);
  }

  const previousQuestion = () => {
    let currentQuestionIndex = findCurrentQuestionIndex();
    if(currentQuestionIndex > 0)
    {
      let questionId = state.questionnaire.questions[currentQuestionIndex - 1].identifier;
      dispatch(jumpToQuestion(questionId));
    }
  }
  
  const nextQuestion = () => {
    let currentQuestionIndex = findCurrentQuestionIndex()
    if(currentQuestionIndex < state.questionnaire.questions.length - 1)
    {
      let questionId = state.questionnaire.questions[currentQuestionIndex + 1].identifier;
      dispatch(jumpToQuestion(questionId));
    }
  }

  const showComponents = () =>{
    let currentQuestion = findCurrentQuestion();
    if(currentQuestion?.question_type === 'multiple-choice')
    {
      return <MultipleChoice />
    }
    else
    {
      return <Text />
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          {showComponents()}
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonContainer aria-label='Basic'>
            <Button variant='secondary' onClick={previousQuestion} data-testid='previousQuestionBtn'>&#8593;</Button>
            <Button variant='secondary' onClick={nextQuestion} data-testid='nextQuestionBtn'>&#8595;</Button>
          </ButtonContainer>
        </Col>
      </Row>
    </Container>
  );
}