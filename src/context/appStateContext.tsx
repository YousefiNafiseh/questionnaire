import { AppState } from '../types/model';
import React, { createContext, useContext } from 'react';


const AppStateContext = createContext<AppState>({
  questionnaire: {
    id: 0,
    identifier: '',
    name: '',
    questions: [],
    description: '',
    category_name_hyphenated: '',
  },
  answers: [],
  questionId: '',
  finished: false,
  questionnaireNumber: 0,
  showRequiredMessage: false,
});

function useAppState() {
  const appState = useContext(AppStateContext);
  return appState;
}

interface ProviderArgs {
  state: AppState;
}

function Provider({ state, ...rest }: React.PropsWithChildren<ProviderArgs>) {
  const appState = React.useMemo(() => state, [state]);
  return <AppStateContext.Provider value={appState} {...rest}></AppStateContext.Provider>
}

export {
  Provider,
  useAppState
}