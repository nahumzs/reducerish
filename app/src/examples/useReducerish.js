import styled from "styled-components";
import Button from "@paprika/button";
import { useReducerish } from "../lib";
import Story from "../Story";

const ButtonGroup = styled.div`
  & button {
    margin: 4px;
  }
`;

export default function App() {
  function up(state) {
    return state + 1;
  }

  function down(state) {
    return state - 1;
  }

  const [state, dispatch] = useReducerish({ up, down }, 0, null, true);

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      onKeyDown={(event) => {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          dispatch("up");
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          dispatch("down");
        }
      }}
      tabIndex={0}
    >
      <ButtonGroup>
        <Button onClick={() => dispatch("up")}>+</Button>
        <Button onClick={() => dispatch("down")}>-</Button>
      </ButtonGroup>
      <div style={{ fontSize: "4rem", fontWeight: "bold" }}>{state}</div>
    </div>
  );
}

App.Story = () => {
  const code = `import { useReducerish } from "reducerish";

export default function App() {
  function up(state) {
    return state + 1;
  }

  function down(state) {
    return state - 1;
  }

  const [state, dispatch] = useReducerish({ up, down }, 0);
  return (
    <>
      <button onClick={() => dispatch("up")}>+</button>
      <button onClick={() => dispatch("down")}>-</button>
      {state}
    </>
  );
}
  `;
  return <Story render={<App />} code={code} />;
};
