import React, {createContext, ReactNode, useContext, useReducer} from 'react';
import {AuthDataResponse} from "../../interface/auth";
import {BarDto} from "../../interface/bar.ts";

type BarState = { bar: BarDto | null };
type AuthState = { user: AuthDataResponse | null };
export type GlobalState = {
  auth: AuthState
  currentBar: BarState
};

type Action =
    | { type: 'setUser'; payload: AuthDataResponse }
    | { type: 'setBar'; payload: BarDto };


const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'setUser':
      return {user: action.payload};
    default:
      return state;
  }
};

const barReducer = (state: BarState, action: Action): BarState => {
  switch (action.type) {
    case 'setBar':
      return {bar: action.payload};
    default:
      return state;
  }
};

function combineReducers<S>(slices: Record<string, any>) {
  return (state: S, action: Action): S => {
    const newState = {} as any;
    let hasChanged = false;
    for (const key in slices) {
      const prevSlice = (state as any)[key];
      const nextSlice = slices[key](prevSlice, action);
      newState[key] = nextSlice;
      if (nextSlice !== prevSlice) hasChanged = true;
    }
    return hasChanged ? newState : state;
  };
}

const rootReducer = combineReducers<GlobalState>({
  auth: authReducer,
  currentBar: barReducer,
});

const initialState: GlobalState = {
  auth: {user: null},
  currentBar: {bar: null}
};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);
const GlobalDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

export const GlobalProvider = ({children}: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
      <GlobalStateContext.Provider value={state}>
        <GlobalDispatchContext.Provider value={dispatch}>
          {children}
        </GlobalDispatchContext.Provider>
      </GlobalStateContext.Provider>
  );
};

// --- Hooks ---
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error('useGlobalState must be used within GlobalProvider');
  return context;
};

export const useGlobalDispatch = () => {
  const context = useContext(GlobalDispatchContext);
  if (!context) throw new Error('useGlobalDispatch must be used within GlobalProvider');
  return context;
};
