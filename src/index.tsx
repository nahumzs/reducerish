import React from "react";

// more info https://github.com/facebook/react/issues/15156

export const contextState = React.createContext(null);
export const contextDispatch = React.createContext(null);

type actionType = { [key: string]: unknown };
interface ProviderInterface {
  actions: actionType;
  children: any;
  displayName: string;
  hasLogger: boolean;
  initialState: unknown;
  initializer(): any;
}

export function Provider({
  actions,
  children,
  displayName = null,
  hasLogger = false,
  initialState,
  initializer = undefined,
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

  const types = React.useMemo(() => getTypes(actions), [actions]);

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

export const useState = () => {
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

export const useDispatch = () => {
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

export const useReducerishWithContext = () => {
  const [dispatch, types] = useDispatch();
  return [useState(), dispatch, types];
};

type reducerish = [
  state: unknown,
  dispatch: (string, unknown?) => unknown,
  types: actionType
];

export const useReducerish = (
  actions: actionType,
  initialState: unknown,
  initializer: () => unknown = undefined,
  hasLogger: boolean = false
) => {
  if (!actions) {
    throw new Error(
      "Actions are required for useReducerish, is an object with their actions as their properties"
    );
  }

  const types = React.useMemo(() => getTypes(actions), [actions]);

  const reducerMemo = React.useMemo(() => {
    return reducer(actions || {}, hasLogger);
  }, [actions, hasLogger]);

  const [state, dispatch] = React.useReducer(
    reducerMemo,
    initialState,
    // if initializer is not a function just skipped by passing undefined so hasLogger can work
    typeof initializer === "function" ? initializer : undefined
  );

  function dispatchCallback(...args) {
    const [type, payload] = args;
    dispatch({
      type,
      payload,
    });
  }

  return [state, dispatchCallback, types] as reducerish;
};

const styles = {
  prev: `color: #F312A7;`,
  action: `color: #A5DE5D;`,
  next: `color: #25D8FF; font-weight:bold;`,
  finished: `color: #BEBEBE;`,
};

function logger(prevState, nextState, action) {
  console.groupCollapsed(
    `action: ${action.type} @ ${new Date().toLocaleTimeString()}`
  );

  // we don't want to showcase payload if it's undefined
  if (typeof action.payload === "undefined") delete action.payload;

  console.log(`%c∙ prev state`, styles.prev, prevState);
  console.log(`%c∙ action`, styles.action, action);
  console.log(`%c✦ next state`, styles.next, nextState);
  console.log(
    `%c∙ finished @`,
    styles.finished,
    `${new Date().toLocaleTimeString()}`
  );
  console.groupEnd();

  return nextState;
}

const reducer = (actions, hasLogger) => (state, action) => {
  if ("type" in action) {
    if (([action.type] as any) in actions) {
      const nextState = actions[action.type](state, action.payload);

      if (hasLogger) {
        return logger(state, nextState, action);
      }

      return nextState;
    }

    throw new Error(`${action.type} lacks of an implementation`);
  }

  throw new Error(
    "Any dispatch action requires to be an object and have at least a type :string action"
  );
};

function getTypes(actions) {
  let o = {};
  for (let action in actions) {
    o = { ...o, [actions[action].name]: actions[action].name };
  }
  return o;
}

function setContextDisplayName(contextState, displayName) {
  contextState.displayName = displayName
    ? `${displayName}State`
    : "ContextSimpleReducerState";

  contextDispatch.displayName = displayName
    ? `${displayName}Dispatch`
    : "ContextSimpleReducerDispatch";
}
