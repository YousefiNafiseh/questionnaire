import { 
  useEffect,
  useState
} from 'react';
import {
  Row,
  Col,
  Button,
  Form,
} from 'react-bootstrap';

import { Questions } from '../../../types/model';
import { submitAnswer, saveItem } from '../../../stateManager/actionCreator';
import { useAppState } from '../../../context/appStateContext';
import { useDispatch } from '../../../context/dispatcherContext';
import Layout from './layout';

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
    <Layout headline={currentQuestion?.headline}>
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
    </Layout>
  );
}