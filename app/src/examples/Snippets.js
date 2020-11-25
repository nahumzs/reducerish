import Code from "../Code";

export default function App({ snippet }) {
  return <Code code={snippets[snippet]} />;
}

const snippets = {
  0: `useReducerish(actions: {[name]:function}, initialState: unknown, lazyLoading:function, hasLogger:boolean)
}
`,
  1: `import { useReducerish } from "reducerish";

  const actions = {
    add() {},
    delete() {},
    update() {},
    search() {},
    get() {},
  }

  // or 

  function add() {},
  function delete() {},
  function update() {},
  function search() {},
  function get() {},
  function const initialState = {...};

  useReducerish({ add, delete, update, search, get }, initialState)
`,
  2: `// actions.js
export function add() {},
export function delete() {},
export function update() {},
export function search() {},
export function get() {},

// App.js
import * as actions from "./actions.js"
useReducerish(actions, {...})
`,
  hasLogger: `import { Provider, useReducerish } from "reducerish";

// when using it with useReducerish
// if you are not using an initializer (lazy loading) you can use it as:
// signature (actions, initialState, initializer, hasLogger)
useReducerish(actions, initialState, null, true)


// when using it with useReducerishWithContext
<Provider actions={...} initialState={...} hasLogger>
  <App />
<Provider>
`,
  types: `// --------
// useReducerish provides a third value (types when destructuring the array
const [state, dispatch, types] = useReducerish({ up, down }, 0);
// so now having the types you prevent types errors by doing:
dispatch(types.up);
dispatch(types.down);

// --------
// your actions
function add(state, payload){ ... }
function remove(state, payload){ ... }

// like useReducerish useReducerishWithContext follow the same pattern
const [state, dispatch, types] = useReducerishWithContext();

dispatch(types.add, value);
dispatch(types.remove, value);

// --------
// actions.js
// you can even split your action in their own file
export const search(actions, payload) {...}
export const sort(actions, payload) {...}
export const remove(actions, payload) {...}

// App.js
import * as actions from "./actions";
const [state, dispatch, types] = useReducerish(actions, initialState);

dispatch(types.search, value);
dispatch(types.sort, value);
dispatch(types.remove, value);
  `,
};
