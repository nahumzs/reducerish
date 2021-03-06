import React from "react";
import reducer from "./reducer";
import getTypes from "./getTypes";

interface actionTypeInterface {
  [key: string]: (action: any, payload: any, next?: () => {}) => unknown;
}

type reducerish = [
  state: unknown,
  dispatch: (string, unknown?) => unknown,
  types: actionTypeInterface
];

export const useSeducer = (
  actions: actionTypeInterface,
  initialState: unknown = {},
  initializer: () => unknown = undefined,
  hasLogger: boolean = false,
  interceptors = {}
) => {
  if (!actions) {
    throw new Error(
      "Actions are required for useSeducer, is an object with their actions as their properties"
    );
  }

  const types = React.useMemo(() => getTypes({ ...interceptors, ...actions }), [
    actions,
  ]);

  const reducerMemo = React.useMemo(() => {
    return reducer(actions || {}, hasLogger, interceptors);
  }, [actions, hasLogger, interceptors]);

  const [state, dispatch] = React.useReducer(
    reducerMemo,
    initialState,
    // if initializer is not a function just skipped by passing undefined so hasLogger can work
    typeof initializer === "function" ? initializer : undefined
  );

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
        dispatch({ type, payload });
      },
    []
  );

  return [state, memoCustomDispatch, types] as reducerish;
};
