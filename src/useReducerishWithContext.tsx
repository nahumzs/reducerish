import React from "react";
import reducer from "./reducer";
import getTypes from "./getTypes";

export const contextState = React.createContext(null);
export const contextDispatch = React.createContext(null);

export const useReducerishWithContext = () => {
  const [dispatch, types] = useDispatch();
  return [useState(), dispatch, types];
};

export function Provider({
  actions,
  children,
  displayName = null,
  hasLogger = false,
  initialState,
  initializer = undefined,
  interceptors = null,
}: ProviderInterface) {
  if (typeof initializer !== "undefined" && typeof initializer !== "function")
    throw new Error("the initializer prop must be a function");

  const reducerMemo = React.useMemo(() => {
    return reducer(actions || {}, hasLogger);
  }, [actions, hasLogger]);

  const [state, dispatch] = React.useReducer(
    reducerMemo,
    initialState,
    initializer
  );

  const types = React.useMemo(
    () => getTypes({ ...({} ?? interceptors), ...actions }),
    [actions]
  );

  setContextDisplayName(contextState, displayName);

  function dispatchCallback(...args) {
    const [type, payload] = args;
    dispatch({
      type,
      payload,
    });
  }

  return (
    <contextState.Provider value={state}>
      <contextDispatch.Provider value={[dispatchCallback, types]}>
        {children}
      </contextDispatch.Provider>
    </contextState.Provider>
  );
}

const useState = () => {
  const state = React.useContext(contextState);
  if (state === undefined) {
    throw new Error(`useState must be used with a Provider \n
Normally this means that your component its not wrapped by a provider.
Either move your component inside the <Provider /> component or 
imported it: import { Provider } and wrap your component within it. 
    `);
  }

  return state;
};

const useDispatch = () => {
  const [dispatch, types] = React.useContext(contextDispatch);
  if (dispatch === undefined || types === undefined) {
    throw new Error(`useDispatch must be used with a Provider \n
Normally this means that your component its not wrapped by a provider.
Either move your component inside the <Provider /> component or 
imported it: import { Provider } and wrap your component within it.
    `);
  }

  return [dispatch, types];
};

function setContextDisplayName(contextState, displayName) {
  contextState.displayName = displayName
    ? `${displayName}State`
    : "ContextSimpleReducerState";

  contextDispatch.displayName = displayName
    ? `${displayName}Dispatch`
    : "ContextSimpleReducerDispatch";
}

interface actionTypeInterface {
  [key: string]: (action: string, payload: any, next?: () => {}) => unknown;
}

interface ProviderInterface {
  actions: actionTypeInterface;
  children: any;
  displayName: string;
  hasLogger: boolean;
  initialState: unknown;
  initializer(): any;
  interceptors: actionTypeInterface;
}
