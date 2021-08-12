import {
  useEffect,
  useState
} from 'react';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import Cards from '../card/index';
import Questions from '../questions/index';
import styled from 'styled-components';
import { useDispatch } from '../../context/dispatcherContext';
import { useAppState } from '../../context/appStateContext';
import { initQuestionnaire } from '../../stateManager/actionCreator';
import SuccessAlert from '../questions/components/alert';

const QuestionnaireContainer = styled(Container)`
  background-image: url(/background.png);
  background-color: rgb(59, 187, 163);
  background-size:cover;
  z-index:-20;
  width:100%;
  height:100vh;
`;

export default function Questionnaires() {
  const dispatch = useDispatch();
  const state = useAppState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // eslint-disable-next-line
    dispatch(initQuestionnaire());
    setLoading(false);
    // eslint-disable-next-line
  }, [state.counter]);

  const showComponent = () => {
    if (!state.finished && !loading && !state.questionId) {
      return <Cards />
    }
    else if (!state.finished && !loading && !!state.questionId) {
      return <Questions />
    }
    else if(!!state.finished) {
    return <SuccessAlert />  
    }
  }

  return (
    <QuestionnaireContainer fluid>
      <Row>
        <Col>
          {showComponent()}
        </Col>
      </Row>
    </QuestionnaireContainer>
  );
}