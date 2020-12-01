import { useEffect, useRef } from "react";
import Button from "@paprika/button";
import Input from "@paprika/input";
import { useSeducer } from "../lib";
import Story from "../Story";

const actions = {
  selected(state, payload) {
    return { ...state, selected: new Set(payload || []) };
  },
  characters(state, payload) {
    return { ...state, characters: new Set(payload || []) };
  },
  toggle(state, payload) {
    let removeFrom = new Set(state.characters);
    let moveTo = new Set(state.selected);

    if (state.selected.has(payload)) {
      removeFrom = new Set(state.selected);
      moveTo = new Set(state.characters);
      removeFrom.delete(payload);
      moveTo.add(payload);

      return {
        ...state,
        selected: removeFrom,
        characters: moveTo,
      };
    }

    removeFrom.delete(payload);
    moveTo.add(payload);

    return {
      ...state,
      selected: moveTo,
      characters: removeFrom,
    };
  },

  addCharacter(state, payload) {
    const next = new Set(state.characters);
    next.add(payload);
    return { ...state, characters: next };
  },
};

const initialState = {
  selected: new Set([]),
  characters: new Set([]),
};

export function useCharacterList() {
  const [state, dispatch, types] = useSeducer(
    actions,
    initialState,
    null,
    true
  );

  return [state, dispatch, types];
}

export default function CharactersList({
  initialSelected = null,
  initialCharacters = null,
  store: storeProps,
}) {
  const refInput = useRef(null);
  const storeDefault = useCharacterList();
  const [state, dispatch, types] = storeProps || storeDefault;

  const handleToggle = (value) => () => {
    dispatch(types.toggle, value);
  };

  useEffect(() => {
    dispatch(
      types.characters,
      initialCharacters || new Set(["Bart", "List", "Milhouse"])
    );
    dispatch(
      types.selected,
      initialSelected || new Set(["Moe", "Homer", "Marge"])
    );
  }, []); // eslint-disable-line

  return (
    <div style={{ maxWidth: "35vw" }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const value = refInput.current.value;
          if (Boolean(value)) {
            dispatch(types.addCharacter, refInput.current.value);
            refInput.current.value = "";
          }
        }}
      >
        <label htmlFor="new-character">Add character:</label>
        <Input id="new-character" ref={refInput} />
      </form>
      <br />
      <div style={{ display: "flex" }}>
        <div>
          <strong>Selected:</strong>
          <ul>
            {Array.from(state.selected).map((character) => (
              <li key={character}>
                {character}
                <Button onClick={handleToggle(character)}>Swap</Button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Characters:</strong>
          <ul>
            {Array.from(state.characters).map((character) => (
              <li key={character}>
                {character}
                <Button onClick={handleToggle(character)}>Swap</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Controlled() {
  const store = useCharacterList();
  const [state, dispatch, types] = store;

  return (
    <>
      <Button
        onClick={() => {
          dispatch(
            types.characters,
            new Set([
              ...state.characters,
              ...new Set(["Black Panther", "Wolf", "The Blob"]),
            ])
          );
        }}
      >
        Add 3 character in one
      </Button>

      <CharactersList
        store={store}
        initialSelected={new Set(["hulk", "wonder woman"])}
        initialCharacters={new Set(["iron-man", "venom"])}
      />
    </>
  );
}

CharactersList.Story = () => {
  const code = `import { useSeducer } from "seducer";

export default function App() {
  function up(state) {
    return state + 1;
  }

  function down(state) {
    return state - 1;
  }

  const [state, dispatch] = useSeducer({ up, down }, 0);
  return (
    <>
      <button onClick={() => dispatch("up")}>+</button>
      <button onClick={() => dispatch("down")}>-</button>
      {state}
    </>
  );
}
  `;
  return <Story render={<CharactersList />} code={code} />;
};
