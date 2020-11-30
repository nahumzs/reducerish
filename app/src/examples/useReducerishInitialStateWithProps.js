import { useReducerishWithContext, Provider } from "../lib";

function MyComponent() {
  const [state] = useReducerishWithContext();
  console.log(state);

  return <span>::: {state}</span>;
}

function Root({ initialState }) {
  return (
    <Provider initialState={initialState} actions={{}}>
      <MyComponent />
    </Provider>
  );
}

export default function App() {
  return <Root initialState={["hi", "how", "are", "you"]} />;
}
