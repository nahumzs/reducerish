import UseReducerish from "./examples/useReducerish";
import UseReducerishWithContext from "./examples/useReducerishWithContext";
import styled, { css, createGlobalStyle } from "styled-components";
import Snippets from "./examples/Snippets";

const r = "Reducerish";
const ur = "useReducerish";
const urw = "useReducerishWithContext";
const rur = "React.useReducer";
const rus = "React.useState";
const rc = "React.createContext";

export default function App() {
  return (
    <>
      <Global />
      <styles.Content>
        <h1>{r}</h1>
        <p>
          <code>{rur}</code> is an awesome hook but more often than not it is
          overshadow by its relative <code>{rus}</code> which is easier and
          simple to use.
        </p>
        <p>Personally, I think is mostly by some of the following reasons:</p>
        <ul>
          <li>
            Reducers are not the bread and butter of all react-developers unlike
            <code>{rus}</code>. This make it a harder pattern to memorize.
          </li>
          <li>
            Apart from simple examples <code>{rur}</code> requires some
            boilerplate to make it functional.
          </li>
          <li>
            To make it consumable across different components you need to pair
            it with the <code>{rc}</code> and you will need more boilerplate to
            use it.
          </li>
          <li>
            And because all above, our beloved
            <code>{rus}</code> is picked first than <code>{rur}</code> each time
          </li>
        </ul>

        <p>
          To mitigate some of these reasons, I created <code>{r}</code> which is
          a simple wrapper on top of <code>{rur}</code>, making it easier to use
          with a more friendly approach.
        </p>
        <p>
          <code>{r}</code> provides two hooks that you can consume{" "}
          <code>{ur}</code> and <code>{urw}</code>
        </p>
        <p>
          Ok, showtime, these are a basic example for
          <code>{ur}</code> and a more elaborated one for <code>{urw}</code>.
        </p>
        <p>
          This is a simple example for <code>{ur}</code>:
        </p>
        <UseReducerish.Story />
        <p>
          And now using <code>{urw}</code>:
        </p>
        <UseReducerishWithContext.Story />
        <p>
          Using <code>{r}</code> comes with some perks from the developer
          experience side of things. You can turn on a Logger while{" "}
          <code>{ur}</code> or <code>{urw}</code>.
        </p>
        <h3>hasLogger</h3>
        <p>How to enable it:</p>
        <Snippets snippet="hasLogger" />
        <p>What you can expect:</p>
        <img src="./logger.gif" alt="Logger" width="100%" />
        <h3>Types</h3>
        <p>
          In the previous examples you saw me using explicitly typing the name
          of the action in order to dispatch it <code>dispatch("up")</code> or{" "}
          <code>dispatch("add", value)</code> this is fine but prone to typing
          errors. Both hooks provides a way to access the types via a third
          value while destructuring the hook{" "}
          <code>[state, dispatch, types]</code>. {r}'s types get create by
          taking the <strong>functions</strong> name pass-down via the action
          object.
          <br />
          Therefor all the following declaration are valid when organizing your
          actions.
        </p>
        <Snippets snippet="types" />

        <h2>useReducerish()</h2>
        <h2>useReducerishWithContext()</h2>
      </styles.Content>
    </>
  );
}

const Global = createGlobalStyle`
  html, body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

p code {
  font-family: monospace;
  background: #F1F1F1;
  border: 1px solid #DDD;
  border-radius: 4px;
  padding: 4px;
  color: #0077aa;
  margin: 0 0 2px   0;
  display: inline-block;
  font-size: .9rem;
  line-height: 1;
}

p {
  font-size: 1.1rem;
  line-height: 1.4;
}

`;

const styles = {
  Content: styled.div(() => {
    return css`
      padding: 16px;
      font-size: 1rem;
      max-width: 60vw;
    `;
  }),
};
