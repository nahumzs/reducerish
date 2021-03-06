import React from "react";
import reducer from "./reducer";
import getTypes from "./getTypes";

export const contextState = React.createContext(null);
export const contextDispatch = React.createContext(null);

export const useSeducerWithContext = () => {
  const [dispatch, types] = useDispatch();
  return [useState(), dispatch, types];
};

export function Provider({
  actions,
  children,
  displayName = null,
  hasLogger = false,
  initialState = {},
  initializer = undefined,
  interceptors = {},
}: ProviderInterface) {
  if (typeof initializer !== "undefined" && typeof initializer !== "function")
    throw new Error("the initializer prop must be a function");

  const reducerMemo = React.useMemo(() => {
    return reducer(actions || {}, hasLogger, interceptors);
  }, [actions, hasLogger]);

  const [state, dispatch] = React.useReducer(
    reducerMemo,
    initialState,
    initializer
  );

  const types = React.useMemo(() => getTypes({ ...interceptors, ...actions }), [
    actions,
  ]);

  setContextDisplayName(contextState, displayName);

  /**
   * This is a helper that allowed to change the regular dispatch signature which is
   * dispatch({ type: "action", payload: value })
   * to
   * dispatch(types.type, value) which IMO is more versatile, shorter and pleasant to look at it.
   */
  const memoCustomDispatch = React.useMemo(
    () =>
      function dispatchCallback(...args) {
        const [type, payload] = args;
        dispatch({
          type,
          payload,
        });
      },
    []
  );

  return (
    <contextState.Provider value={state}>
      <contextDispatch.Provider value={[memoCustomDispatch, types]}>
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
  [key: string]: (action: any, payload: any, next?: () => {}) => unknown;
}

interface ProviderInterface {
  actions: actionTypeInterface;
  children: any;
  displayName?: string;
  hasLogger?: boolean;
  initialState?: unknown;
  initializer?(): any;
  interceptors?: actionTypeInterface;
}
