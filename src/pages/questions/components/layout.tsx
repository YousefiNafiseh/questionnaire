import {
  Container,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';

import styled from 'styled-components';
import { useAppState } from '../../../context/appStateContext';

const ContainerStyle = styled(Container)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled(Row)`
  padding: 16px 0;
`;

const AlertSection = styled(Row)`
  margin-top:14px;
`;

export default function Layout(props: any) {
  const state = useAppState();

  return (
    <ContainerStyle fluid>
      <Header>
        <Col>
          <h4>{props.headline}</h4>
        </Col>
      </Header>

      {props.children}

      {!!state.showRequiredMessage &&
        <AlertSection>
          <Col>
            <Alert variant='danger'>
              This question is required
            </Alert>
          </Col>
        </AlertSection>
      }

    </ContainerStyle>
  );
}