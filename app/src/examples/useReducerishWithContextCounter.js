import React from "react";
import { Provider, useReducerishWithContext } from "../lib";

function up(state) {
  return state.counter + 1;
}

function down(state) {
  return state.counter - 1;
}

function Counter() {
  const [state, dispatch] = useReducerishWithContext();

  return (
    <>
      <button onClick={() => dispatch("up")}>up</button>{" "}
      <button onClick={() => dispatch("down")}>down</button>
      {state.counter}
    </>
  );
}

export default function App(props) {
  return (
    <Provider initialState={{ counter: 0 }} actions={{ up, down }}>
      <Counter />
    </Provider>
  );
}
