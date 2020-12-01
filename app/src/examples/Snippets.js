import Code from "../Code";

export default function App({ snippet }) {
  return <Code code={snippets[snippet]} />;
}

const snippets = {
  0: `useSeducer(actions: {[name]:function}, initialState: unknown, lazyLoading:function, hasLogger:boolean)
}
`,
  1: `import { useSeducer } from "seducer";

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

  useSeducer({ add, delete, update, search, get }, initialState)
`,
  2: `// actions.js
export function add() {},
export function delete() {},
export function update() {},
export function search() {},
export function get() {},

// App.js
import * as actions from "./actions.js"
useSeducer(actions, {...})
`,
  hasLogger: `import { Provider, useSeducer } from "seducer";

// when using it with useSeducer
// signature (actions, initialState, initializer, hasLogger)
useSeducer(actions, initialState, null, true)


// when using it with useSeducerWithContext
<Provider actions={...} initialState={...} hasLogger>
  <App />
<Provider>
`,
  types: `// --------
// useSeducer provides a third value (types when destructuring the array
const [state, dispatch, types] = useSeducer({ up, down }, 0);
// so now having the types you prevent types errors by doing:
dispatch(types.up);
dispatch(types.down);

// --------
// your actions
function add(state, payload){ ... }
function remove(state, payload){ ... }

// like useSeducer useSeducerWithContext follow the same pattern
const [state, dispatch, types] = useSeducerWithContext();

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
const [state, dispatch, types] = useSeducer(actions, initialState);

dispatch(types.search, value);
dispatch(types.sort, value);
dispatch(types.remove, value);
  `,
};
