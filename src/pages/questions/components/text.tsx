import {
  useEffect,
  useState
} from 'react';

import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from 'react-bootstrap';

import styled from 'styled-components';
import { Questions } from '../../../types/model';
import { submitAnswer, saveItem } from '../../../stateManager/actionCreator';
import { useAppState } from '../../../context/appStateContext';
import { useDispatch } from '../../../context/dispatcherContext';

const TextContainer = styled(Container)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled(Row)`
  padding: 16px 0;
`;

export default function Text() {
  const state = useAppState();
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState<Questions>();


  useEffect(() => {
    let question = state.questionnaire.questions.find(question => question.identifier === state.questionId);
    setCurrentQuestion(question);
     // eslint-disable-next-line
  }, [state.questionId]);

  const loadFormControl = () => {
    let value = !!currentQuestion ? currentQuestion?.description : ''
    if (!!currentQuestion && currentQuestion!.multiline === 'false') {
      return <Form.Control name='answer' type='text' defaultValue={value} />
    }
    else {
      return <Form.Control name='answer' as='textarea' rows={3} defaultValue={value} />
    }
  }

  const getFormData = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    dispatch(saveItem(state.questionId, formDataObj.answer as string));
    dispatch(submitAnswer(state.questionId));
  }

  return (
    <TextContainer>
      <Header>
        <Col>
          <h4>{currentQuestion?.headline}</h4>
        </Col>
      </Header>
      <Row>
        <Col>
          <Form onSubmit={getFormData}>
            <Form.Group className='mb-3' controlId='formText'>
              {loadFormControl()}
            </Form.Group>
            <Button variant='success' type='submit'>
              OK
            </Button>
          </Form>
        </Col>
      </Row>
    </TextContainer>
  );
}