import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';

import styled from 'styled-components';
import { useAppState } from '../../context/appStateContext';
import { useDispatch } from '../../context/dispatcherContext';
import { jumpToQuestion } from '../../stateManager/actionCreator';

const CardContainer = styled(Container)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CardSection = styled(Card)`
  background-color:#55d6be94;
  width:300px;
  margin: auto;
`;

export default function Cards() {
  const state = useAppState();
  const dispatch = useDispatch();

  const handleStartAnswering = () => {
    let questionId = state.questionnaire.questions[0].identifier;
    // eslint-disable-next-line
    dispatch(jumpToQuestion(questionId));
  };

  return (
    <CardContainer fluid>
      <Row>
        <Col>
          <CardSection>
            <Card.Body>
              <Card.Title data-testid='cardTitle'>{state.questionnaire.name}</Card.Title>
              <Card.Text data-testid='cardDescription'>
                {state.questionnaire.description}
              </Card.Text>
              <Button variant='success' data-testid='answerQuestionBtn' onClick={handleStartAnswering}>
                Answer Question
              </Button>
            </Card.Body>
          </CardSection>
        </Col>
      </Row>
    </CardContainer>
  );
}