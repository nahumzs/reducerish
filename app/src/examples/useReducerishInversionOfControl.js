import styled from "styled-components";
import Button from "@paprika/button";
import { useReducerish } from "../lib";
import Confetti from "react-dom-confetti";
import Story from "../Story";
import { reduceRight, shift } from "core-js/fn/array";
import { useReducer } from "react";

const ButtonGroup = styled.div`
  & button {
    margin: 4px;
  }
`;

function useMyReusableCounter() {
  function up(state) {
    return { ...state, sum: state.sum + 1 };
  }

  function down(state) {
    return { ...state, sum: state.sum - 1 };
  }

  const [state, dispatch, types] = useReducerish({ up, down }, { sum: 0 });

  return [state, dispatch, types];
}

function MyReusableCounter({ onUp, onDown, counter }) {
  return (
    <div
      style={{ height: "100%", width: "100%" }}
      onKeyDown={(event) => {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          onUp();
        }

        if (event.key === "ArrowDown") {
          event.preventDefault();
          onDown();
        }
      }}
      tabIndex={0}
    >
      <ButtonGroup>
        <Button onClick={onUp}>+</Button>
        <Button onClick={onDown}>-</Button>
      </ButtonGroup>
      <div style={{ fontSize: "4rem", fontWeight: "bold" }}>{counter}</div>
    </div>
  );

  // actions
  // onSort(function(){})
}

export default function App() {
  function up(state, payload, next) {
    if ((state.sum + 1) % 10 === 0 && state.sum !== 0) {
      return { ...next(), __hasConfetti: true };
    }

    return { ...next(), __hasConfetti: false };
  }

  function duplicate(state) {
    if (state.sum === 0) return { ...state, sum: 1 };
    return { ...state, sum: state.sum * 2 };
  }

  const [state, dispatch, types] = useMyReusableCounter({ up, duplicate });

  return (
    <>
      <Confetti active={state.__hasConfetti} />
      {state.__hasConfetti ? "Wait for the confetti 🎉! " : null}
      <MyReusableCounter
        onUp={() => dispatch(types.up)}
        onDown={() => dispatch(types.down)}
        counter={state.sum}
      />
      {/********************************** FIX THE TYPES!!!!! while spreding */}
      {/********************************** FIX THE TYPES!!!!! while spreding */}
      {/********************************** FIX THE TYPES!!!!! while spreding */}
      {/********************************** FIX THE TYPES!!!!! while spreding */}
      <Button onClick={() => dispatch("duplicate")}>duplicate</Button>
    </>
  );
}
