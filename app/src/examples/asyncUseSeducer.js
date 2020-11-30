import { useSeducer } from "../lib";
import Button from "@paprika/button";
import Story from "../Story";

const actions = {
  loading(state) {
    return { ...state, status: "loading", data: null };
  },
  error(state) {
    return { ...state, status: "has error" };
  },
  response(state, payload) {
    return { ...state, data: payload, status: null };
  },
};

async function asyncFakeFetch({ dispatch, types, hasError }) {
  return new Promise((response, error) => {
    dispatch(types.loading);
    setTimeout(() => {
      if (hasError) {
        error();
        dispatch(types.error);
        return;
      }
      dispatch(types.response, ["🐥", "🐶", "😸", "🐧", "🦊"]);
      response();
    }, 1500);
  });
}

const initialState = { status: null, data: null };

export default function App() {
  const [state, dispatch, types] = useSeducer(
    actions,
    initialState,
    null,
    true
  );
  const { status, data } = state;

  function handleAsyncFetch(hasError = false) {
    asyncFakeFetch({ dispatch, types, hasError });
  }

  return (
    <div>
      <div>
        <Button
          isDisabled={status === "loading"}
          onClick={() => {
            handleAsyncFetch();
          }}
        >
          Fetch Success
        </Button>
        <br />
        <br />
        <Button
          isDisabled={status === "loading"}
          onClick={() => {
            handleAsyncFetch(true);
          }}
        >
          Fetch Error
        </Button>
      </div>
      {status ? (
        <div
          style={{ padding: "8px", border: "1px solid #EEE", marginTop: "8px" }}
        >
          {status}
        </div>
      ) : null}
      {data ? (
        <div
          style={{ padding: "8px", border: "1px solid #EEE", marginTop: "8px" }}
        >
          <ul>
            {data.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

App.Story = () => {
  const code = `import { useSeducer } from "reducerish";

// in your code, you could move these actions into their own file.
const actions = {
  loading(state) {
    return { ...state, status: "loading", data: null };
  },
  error(state) {
    return { ...state, status: "has error" };
  },
  response(state, payload) {
    return { ...state, data: payload, status: null };
  },
};

async function asyncFakeFetch({ dispatch, types, hasError }) {
  return new Promise((response, error) => {
    dispatch(types.loading);
    setTimeout(() => {
      if (hasError) {
        error();
        dispatch(types.error);
        return;
      }
      dispatch(types.response, ["🐥", "🐶", "😸", "🐧", "🦊"]);
      response();
    }, 1500);
  });
}

const initialState = { status: null, data: null };

export default function App() {
  const [state, dispatch, types] = useSeducer(
    actions,
    initialState,
    null,
    true
  );
  
  const { status, data } = state;

  function handleAsyncFetch(hasError = false) {
    asyncFakeFetch({ dispatch, types, hasError });
  }

  return (
    <Button
      isDisabled={status === "loading"}
      onClick={() => { handleAsyncFetch(); }}
    >
      Fetch Success
    </Button>

    <Button
      isDisabled={status === "loading"}
      onClick={() => { handleAsyncFetch(true); }}
    >
      Fetch Error
    </Button>
  {status ? <>{status}</> : null}
  {data ? (
    <>
      {data.map((item) => (
        {item}
      ))}
    </>) : null}
  );
}
`;
  return <Story render={<App />} code={code} />;
};
