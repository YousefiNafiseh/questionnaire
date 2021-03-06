import './App.css';
import { INIT_STATE, reducer } from './stateManager/reducer';
import { Provider as AppStateProvider } from './context/appStateContext';
import { Provider as DispatchProvider } from './context/dispatcherContext';
import Questionnaires from './pages/questionnaire/index';
import useThunkReducer from "react-hook-thunk-reducer";

function App() {
  const [state, dispatch] = useThunkReducer(reducer, INIT_STATE);
  
  return (
    <div className='App' >
      <DispatchProvider dispatch={dispatch}>
        <AppStateProvider state={state}>
          <Questionnaires />
        </AppStateProvider>
      </DispatchProvider>
    </div>
  );
}

export default App;
