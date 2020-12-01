import { useEffect, useState, useRef } from "react";
import Button from "@paprika/button";
import Input from "@paprika/input";
import styled from "styled-components";
import { useSeducer } from "../lib";
import Story from "../Story";

const ButtonGroup = styled.div`
  & button {
    margin: 4px;
  }
`;

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
                <Button
                  size={Button.types.size.SMALL}
                  onClick={handleToggle(character)}
                >
                  remove
                </Button>
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
                <Button
                  size={Button.types.size.SMALL}
                  onClick={handleToggle(character)}
                >
                  select
                </Button>
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
  const [isButtonDisabled, setIsButtonDisable] = useState(false);
  const initialSelected = new Set(["hulk", "wonder woman"]);
  const initialCharacters = new Set(["iron-man", "venom"]);
  return (
    <>
      <ButtonGroup>
        <Button
          isDisabled={isButtonDisabled}
          onClick={() => {
            dispatch(
              types.characters,
              new Set([
                ...state.characters,
                ...new Set(["Black Panther", "Wolf", "The Blob"]),
              ])
            );
            setIsButtonDisable(true);
          }}
        >
          Add 3 character in one
        </Button>
        <Button
          onClick={() => {
            dispatch(types.selected, initialSelected);
            dispatch(types.characters, initialCharacters);
            setIsButtonDisable(false);
          }}
        >
          reset
        </Button>
      </ButtonGroup>
      <CharactersList
        store={store}
        initialSelected={initialSelected}
        initialCharacters={initialCharacters}
      />
    </>
  );
}

CharactersList.Story = () => {
  const code = `const actions = {
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
    <>
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
      <strong>Selected:</strong>
      <ul>
        {Array.from(state.selected).map((character) => (
          <li key={character}>
            {character}
            <Button
              size={Button.types.size.SMALL}
              onClick={handleToggle(character)}
            >
              remove
            </Button>
          </li>
        ))}
      </ul>
      <strong>Characters:</strong>
      <ul>
        {Array.from(state.characters).map((character) => (
          <li key={character}>
            {character}
            <Button
              size={Button.types.size.SMALL}
              onClick={handleToggle(character)}
            >
              select
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Controlled() {
  const store = useCharacterList();
  const [state, dispatch, types] = store;
  const [isButtonDisabled, setIsButtonDisable] = useState(false);
  const initialSelected = new Set(["hulk", "wonder woman"]);
  const initialCharacters = new Set(["iron-man", "venom"]);
  return (
    <>
      <ButtonGroup>
        <Button
          isDisabled={isButtonDisabled}
          onClick={() => {
            dispatch(
              types.characters,
              new Set([
                ...state.characters,
                ...new Set(["Black Panther", "Wolf", "The Blob"]),
              ])
            );
            setIsButtonDisable(true);
          }}
        >
          Add 3 character in one
        </Button>
        <Button
          onClick={() => {
            dispatch(types.selected, initialSelected);
            dispatch(types.characters, initialCharacters);
            setIsButtonDisable(false);
          }}
        >
          reset
        </Button>
      </ButtonGroup>
      <CharactersList
        store={store}
        initialSelected={initialSelected}
        initialCharacters={initialCharacters}
      />
    </>
  );
}
`;
  return <Story render={<CharactersList />} code={code} />;
};
