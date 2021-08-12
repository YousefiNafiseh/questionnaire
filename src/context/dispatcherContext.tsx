import React, { createContext, useContext } from 'react';
import { DispatchModel } from '../types/model';

const DispatchContext = createContext<DispatchModel>(() => undefined);

function useDispatch() {
  const appState = useContext(DispatchContext);
  return appState;
}

interface ProviderArgs {
  dispatch: DispatchModel;
}

function Provider({ dispatch, ...rest }: React.PropsWithChildren<ProviderArgs>) {
  return <DispatchContext.Provider value={dispatch} {...rest} />
}

export {
  Provider,
  useDispatch
}