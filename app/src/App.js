import { useReducerish } from "./lib";

const actions = {
  up(state) {
    return state + 1;
  },
  down(state) {
    return state - 1;
  },
};

const initialState = 0;

function App() {
  const [state, dispatch] = useReducerish({ actions, initialState });
  return (
    <div className="App">
      <button onClick={() => dispatch("up")}>+</button>
      <button onClick={() => dispatch("down")}>-</button>
      {state}
    </div>
  );
}

export default App;
