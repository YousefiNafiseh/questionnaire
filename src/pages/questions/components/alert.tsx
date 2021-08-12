import {
  Alert,
  Button
} from 'react-bootstrap';

import { useDispatch } from '../../../context/dispatcherContext';
import { startAgain } from '../../../stateManager/actionCreator';

export default function SuccessAlert() {
  const dispatch = useDispatch();

  return (
    <Alert show={true} variant="success">
      <Alert.Heading>Finished Question</Alert.Heading>
      <div className="d-flex justify-content-end">
        <Button onClick={() => dispatch(startAgain())} variant="outline-success">
          Show Card
        </Button>
      </div>
    </Alert>
  );
}

