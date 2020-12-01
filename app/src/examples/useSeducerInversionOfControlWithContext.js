import styled from "styled-components";
import Button from "@paprika/button";
import { Provider, useSeducerWithContext } from "../lib";
import Confetti from "react-dom-confetti";
import Story from "../Story";

const ButtonGroup = styled.div`
  & button {
    margin: 4px;
  }
`;

export const actions = {
  up(state) {
    return { ...state, sum: state.sum + 1 };
  },
  down(state) {
    return { ...state, sum: state.sum - 1 };
  },
};

export const initialState = {
  sum: 0,
};

function MyReusableCounter() {
  const [state, dispatch, types] = useSeducerWithContext();

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      onKeyDown={(event) => {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          dispatch(types.up);
        }

        if (event.key === "ArrowDown") {
          event.preventDefault();
          dispatch(types.down);
        }
      }}
      tabIndex={0}
    >
      <ButtonGroup>
        <Button onClick={() => dispatch(types.up)}>+</Button>
        <Button onClick={() => dispatch(types.down)}>-</Button>
      </ButtonGroup>
      <div style={{ fontSize: "4rem", fontWeight: "bold" }}>{state.sum}</div>
    </div>
  );
}

const interceptors = {
  up(state, payload, next) {
    if ((state.sum + 1) % 10 === 0 && state.sum !== 0) {
      return { ...next(), __hasConfetti: true };
    }

    return { ...next(), __hasConfetti: false };
  },
  duplicate(state) {
    if (state.sum === 0) return { ...state, sum: 1 };
    return { ...state, sum: state.sum * 2 };
  },
};

function App() {
  const [state, dispatch, types] = useSeducerWithContext();

  return (
    <div style={{ position: "relative" }}>
      <Confetti active={state.__hasConfetti} />
      {state.__hasConfetti ? (
        <div style={{ position: "absolute", left: "100px", top: "10px" }}>
          Wait for the confetti 🎉!
        </div>
      ) : null}
      <MyReusableCounter />
      <Button onClick={() => dispatch(types.duplicate)}>duplicate</Button>
    </div>
  );
}

export default function Root() {
  return (
    <Provider
      actions={actions}
      initialState={initialState}
      interceptors={interceptors}
      hasLogger
    >
      <App />
    </Provider>
  );
}

Root.Story = () => {
  const code = `// YourReusableComponent.js
  export const actions = {
  up(state) {
    return { ...state, sum: state.sum + 1 };
  },
  down(state) {
    return { ...state, sum: state.sum - 1 };
  },
};

export const initialState = {
  sum: 0,
};

function YourReusableComponent() {
  const [state, dispatch, types] = useSeducerWithContext();

  return (
    <>
      <Button onClick={() => dispatch(types.up)}>+</Button>
      <Button onClick={() => dispatch(types.down)}>-</Button>     
      {state.sum}
    </>
  );
}

// App.js
import YourReusableComponent, { actions, initialState } from "./YourReusableComponent";

const interceptors = {
  up(state, payload, next) {
    if ((state.sum + 1) % 10 === 0 && state.sum !== 0) {
      return { ...next(), __hasConfetti: true };
    }

    return { ...next(), __hasConfetti: false };
  },
  duplicate(state) {
    if (state.sum === 0) return { ...state, sum: 1 };
    return { ...state, sum: state.sum * 2 };
  },
};

function App() {
  const [state, dispatch, types] = useSeducerWithContext();

  return (
    <>
      <Confetti active={state.__hasConfetti} />
      {state.__hasConfetti ? "Wait for the confetti 🎉!" : null}
      <YourReusableComponent />
      <Button onClick={() => dispatch(types.duplicate)}>
        duplicate
      </Button>
    </>
  );
}

export default function Root() {
  return (
    <Provider
      actions={actions}
      initialState={initialState}
      {/* this is where the magic happens */}
      interceptors={interceptors}
      hasLogger
    >
      <App />
    </Provider>
  );
}
`;
  return <Story render={<Root />} code={code} />;
};
