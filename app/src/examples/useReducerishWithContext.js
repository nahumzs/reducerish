import { useRef } from "react";
import Button from "@paprika/button";
import Input from "@paprika/input";
import Times from "@paprika/icon/lib/Times";
import { Provider, useReducerishWithContext } from "../lib";
import Story from "../Story";

function Add() {
  const [, dispatch] = useReducerishWithContext();
  const ref = useRef(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current.value) {
          dispatch("add", ref.current.value);
          ref.current.value = "";
        }
      }}
    >
      <Input ref={ref} defaultValue="" placeholder="add an animal [enter]" />
    </form>
  );
}

function List() {
  const [state, dispatch] = useReducerishWithContext();
  const handleDelete = (item) => () => {
    dispatch("remove", item);
  };

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {Array.from(state).map((item) => (
        <li
          key={item}
          style={{
            padding: "0",
            lineHeight: "2.5",
            borderBottom: "1px solid #EEE",
            display: "flex",
            justifyContent: "space-between",
            margin: 0,
          }}
        >
          <div>{item}</div>
          <div>
            <Button.Icon
              size={Button.types.size.SMALL}
              kind={Button.types.kind.MINOR}
              onClick={handleDelete(item)}
            >
              <Times />
            </Button.Icon>
          </div>
        </li>
      ))}
    </ul>
  );
}

const actions = {
  add(state, payload) {
    const nextList = new Set(state);
    nextList.add(payload);
    return nextList;
  },
  remove(state, payload) {
    const nextList = new Set(state);
    nextList.delete(payload);
    return nextList;
  },
};

const initialState = new Set(["Cat", "Dog", "Bear"]);

export default function App() {
  return (
    <Provider initialState={initialState} actions={actions} hasLogger>
      <List />
      <Add />
    </Provider>
  );
}

App.Story = () => {
  const code = `import { Provider, useReducerishWithContext } from "reducerish";

const actions = {
  add(state, payload) {
    const nextList = new Set(state);
    nextList.add(payload);
    return nextList;
  },
  remove(state, payload) {
    const nextList = new Set(state);
    nextList.delete(payload);
    return nextList;
  },
};

const initialState = new Set(["Cat", "Dog", "Bear"]);

export default function App() {
  return (
    <Provider initialState={initialState} actions={actions}>
      <List />
      <Add />
    </Provider>
  );
}

function Add() {
  const [, dispatch] = useReducerishWithContext();
  return (
    <form onSubmit={() => dispatch("add", ref.current.value)}>
      <Input ref={ref} defaultValue="" placeholder="add an animal [enter]" />
    </form>
  );
}

function List() {
  const [state, dispatch] = useReducerishWithContext();
  const handleDelete = (item) => () => {
    dispatch("remove", item);
  };

  return (
    <ul>
      {Array.from(state).map((item) => (
        <li>
          {item}
          <Button onClick={handleDelete(item)}>
            <Times />
          </Button>
        </li>
      ))}
    </ul>
  );
}  
`;
  return <Story render={<App />} code={code} />;
};
