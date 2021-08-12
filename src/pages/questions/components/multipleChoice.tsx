import {
  useEffect,
  useState
} from 'react'

import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
} from 'react-bootstrap';

import styled from 'styled-components';
import { Questions, Choices } from '../../../types/model';
import { submitAnswer, saveItem} from '../../../stateManager/actionCreator';
import { useAppState } from '../../../context/appStateContext';
import { useDispatch } from '../../../context/dispatcherContext';

const MultipleChoiceContainer = styled(Container)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled(Row)`
  padding: 16px 0;
`;

const ButtonRow = styled(Row)`
  margin-top:16px;
`;

const ListItem = styled(ListGroup.Item)`
  &:hover {
  cursor:pointer;
}
`;

export default function MultipleChoice() {
  const state = useAppState();
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState<Questions>();

  useEffect(() => {
    let question = state.questionnaire.questions.find(question => question.identifier === state.questionId);
    setCurrentQuestion(question);
    // eslint-disable-next-line
  }, [state.questionId])

  const saveAnswer = () => {
    dispatch(submitAnswer(state.questionId));
  }

  const saveItemValue = (value: string) => {
    dispatch(saveItem(state.questionId, value));
  }

  const showListItem = () =>{
    let question = state.questionnaire.questions.find(question => question.identifier === state.questionId);
    return question?.choices?.map((choice: Choices, index: number) => {
      let isActive = choice.selected ? { active: true } : {};
      return (
        <ListItem
          {...isActive}
          key={index + Math.random()}
          onClick={() => saveItemValue(choice.value)}>
          {choice.label}
        </ListItem>
      )
    })
  }

  return (
    <MultipleChoiceContainer fluid>
      <Header>
        <Col>
          <h4>{currentQuestion?.headline}</h4>
        </Col>
      </Header>
      <Row>
        <Col>
          <ListGroup>
            {showListItem()}
          </ListGroup>
        </Col>
      </Row>
      <ButtonRow>
        <Col>
          <Button variant='success' onClick={() => saveAnswer()}>
            OK
          </Button>
        </Col>
      </ButtonRow>
    </MultipleChoiceContainer>
  );
}