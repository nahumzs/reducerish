import UseReducerish from "./examples/useSeducer";
import UseReducerishWithContext from "./examples/useSeducerWithContext";
import AsyncUseReducerish from "./examples/asyncUseSeducer";
import UseReducerishInversionOfControl from "./examples/useSeducerInversionOfControl";
import styled, { css, createGlobalStyle } from "styled-components";
import Snippets from "./examples/Snippets";
import Link from "./Link";

const r = "Seducer";
const ur = "useSeducer";
const urw = "useSeducerWithContext";
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
          To mitigate some of these reasons, I created <code>{r}</code> (simple
          reducer) which is a simple wrapper on top of <code>{rur}</code>,
          making it easier to use and with a more friendly approach.
        </p>
        <p>
          <code>{r}</code> provides two hooks that you can consume{" "}
          <code>{ur}</code> and <code>{urw}</code>.
        </p>
        <p>
          Ok, showtime, these are a basic example for
          <code>{ur}</code> and a more elaborated one for <code>{urw}</code>.
        </p>
        <p>
          <strong>{ur}</strong>:
        </p>
        <UseReducerish.Story />
        <p>
          <strong>{urw}</strong>:
        </p>
        <UseReducerishWithContext.Story />
        <h2>DEV-UX</h2>
        <p>
          Using <code>{r}</code> comes with some perks from the developer
          experience side of things. As example includes a Logger, types,
          allowed you to customize the displayName of the reducer and finally
          also allow you to make use of "inversion of control" with minimal
          effort.
        </p>
        <h3>hasLogger</h3>
        <p>
          When enable on <code>{ur}</code> or <code>{urw}</code> will print on
          the <em>dev console</em> their previous and next state each time an
          actions is executed, providing the consumer with a nicer picture of
          what it's happening with their state.
        </p>
        <Snippets snippet="hasLogger" />
        <p>this is what you can expect to see in you dev console:</p>
        <img src="./logger.gif" alt="Logger" width="100%" />
        <h3>Types</h3>
        <p>
          In previous examples you saw me explicitly typing the name of the
          action in order to dispatch it <code>dispatch("up")</code> or{" "}
          <code>dispatch("add", value)</code> this is fine but prone to typing
          errors. <br />
        </p>
        <p>
          Both hooks provides a way to access their types via a third value
          while destructuring their hooks <code>[state, dispatch, types]</code>.{" "}
          {r}'s types get create by taking the <strong>functions</strong> name
          pass-down via the action object.
        </p>
        <p>
          Make use of the types help you as well at the moment of renaming or
          refactoring your code since it's easier to find and replace.
        </p>
        <Snippets snippet="types" />
        <h2>What about async functions and {r}</h2>
        <p>
          <em>Async</em> functions are not different or special for{" "}
          <strong>{r}</strong>, You can keep using async functions as you were
          doing it before with <strong>{rur}</strong>.
        </p>
        <p>
          Saying that here is a small example about how to handle this scenario
          either with <strong>{rur}</strong> or <strong>{r}</strong>. Also worth
          nothing that there is nothing preventing you from using{" "}
          <code>{r}</code> with popular Libraries like{" "}
          <Link src="https://github.com/tannerlinsley/react-query">
            react-query
          </Link>{" "}
          or <Link src="https://github.com/immerjs/immer">Immer</Link>.
        </p>
        <AsyncUseReducerish.Story />
        <h2>Inversion of Control</h2>
        <UseReducerishInversionOfControl />
        <h2 style={{ marginTop: "128px" }}>FAQ</h2>
        <styles.FAQList>
          <styles.FAQItem>
            <styles.FAQQ>Why did I coded this?</styles.FAQQ>
            <styles.FAQA>
              As I described in the beginning of the page one of the main reason
              was to make <code>{rur}</code> more approachable to any developer
              independently from their expertise level. <br />
              But also, I did it because I'm a library author and having the
              power of reducers without introducing a peer-dependency in your
              library, is quite nice and also mitigate some of the hassles for
              your consumers when consuming your Components 😸. And lastly and
              more important in advances cases is that {r} provides a way to
              implemented <strong>Inversion of control</strong> in a simple way,
              without forcing you to export a reducer, neither to learn
              convolute approaches. <strong>wip ("example to be added")</strong>
            </styles.FAQA>
          </styles.FAQItem>
          <styles.FAQItem>
            <styles.FAQQ>Is this a new state manager library?</styles.FAQQ>
            <styles.FAQA>
              No, <code>{r}</code> is just a wrapper on top of{" "}
              <code>{rur}</code> that's all, React is still in charge of the
              state.
            </styles.FAQA>
          </styles.FAQItem>
          <styles.FAQItem>
            <styles.FAQQ>
              Do this wrapper is a replacement for REDUX?
            </styles.FAQQ>
            <styles.FAQA>
              No, This is just a small package catering to small and medium
              components where <code>{rur}</code> plays better than regular{" "}
              <code>{rus}</code>; Remember is just <code>{rur}</code> with some
              sparkles on top of it ✨. <br />
              <strong>Redux</strong> instead is a battle tested library with a
              bigger scope and catering different need and requirements.
            </styles.FAQA>
          </styles.FAQItem>
          <styles.FAQItem>
            <styles.FAQQ>
              When should I picked {rur} (Seducer) instead {rus}?
            </styles.FAQQ>
            <styles.FAQA>
              The React's documentation put it like this:
            </styles.FAQA>
            <blockquote>
              useReducer is usually preferable to useState when you have complex
              state logic that involves{" "}
              <styles.Marker>multiple sub-values</styles.Marker> or{" "}
              <styles.Marker>
                when the next state depends on the previous one
              </styles.Marker>
              . useReducer also lets you optimize performance for components
              that <styles.Marker>trigger deep updates</styles.Marker> because
              you can pass dispatch down instead of callbacks.
              <footer>
                --
                <a
                  href="https://reactjs.org/docs/hooks-reference.html#usereducer"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  React useReducer
                </a>
              </footer>
            </blockquote>
            <styles.FAQA>
              If you want to keep reading more about this, Kent C. Dodds{" "}
              <a
                href="https://kentcdodds.com/blog/should-i-usestate-or-usereducer"
                target="_blank"
                rel="noreferrer noopener"
              >
                has a more elaborated answer.
              </a>
            </styles.FAQA>
          </styles.FAQItem>
          <styles.FAQItem>
            <styles.FAQQ>
              Where can I read more about useReducer, Context and related
              topics?
            </styles.FAQQ>
            <styles.FAQA as="div">
              <p>These are some interesting sources:</p>
              <ul>
                <li>
                  These three posts{" "}
                  <Link src="https://kentcdodds.com/blog/how-to-use-react-context-effectively">
                    How to use React Context effectively
                  </Link>{" "}
                  /{" "}
                  <Link src="https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks">
                    The State Reducer Pattern with React Hooks
                  </Link>{" "}
                  <Link src="https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer">
                    How to implement useState with useReducer
                  </Link>
                  - By Kent C. Dodds
                </li>
                <li>
                  <Link src="https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#react-1">
                    The one with hooks
                  </Link>
                </li>
                <li>
                  The documentation 😅{" "}
                  <Link src="https://reactjs.org/docs/hooks-reference.html#usereducer">
                    useReducer
                  </Link>
                </li>
                <li>
                  Inversion of Control:
                  <Link src="https://en.wikipedia.org/wiki/Inversion_of_control">
                    Inversion of control - Wikipedia
                  </Link>{" "}
                  and{" "}
                  <Link src="https://kentcdodds.com/blog/inversion-of-control">
                    Inversion of control - Kent C. Dodds.
                  </Link>
                </li>
                <li>
                  Some information about useReducer, dispatch and context
                  <Link src="https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down">
                    How to avoid passing callbacks down?
                  </Link>
                </li>
                <li>
                  Stackoverflow answer Redux vs useReducer{" "}
                  <Link src="https://stackoverflow.com/questions/54576865/when-to-use-native-react-usereducer-hook-and-how-it-differentiate-from-redux">
                    When to use native React.useReducer Hook and how it
                    differentiate from Redux
                  </Link>{" "}
                  - Some answer are not entirely correct.
                </li>
                <li>
                  Dan Abramov recipe for avoiding re-renders with context.
                  <Link src="https://github.com/facebook/react/issues/15156#issuecomment-474590693">
                    Preventing rerenders with React.memo and useContext hook.
                    #15156
                  </Link>
                </li>
                <li>
                  <Link src="https://redux-toolkit.js.org/tutorials/basic-tutorial">
                    {" "}
                    Redux basic tutorial
                  </Link>{" "}
                  an example about how to use it. If you are interested.
                </li>
              </ul>
            </styles.FAQA>
          </styles.FAQItem>
        </styles.FAQList>
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
  font-size: 1.2rem;
  line-height: 1.4;
}

blockquote {
  border-left: 4px solid #DDD;
  margin: 1rem 1rem;
  padding-left: 1rem;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style:italic;
  font-size: 1rem;
  line-height: 1.7;
}

li {
  padding: 0.5rem;
  font-size: 1.2rem;
}
`;

const styles = {
  Content: styled.div(() => {
    return css`
      padding: 16px;
      font-size: 1rem;
      width: 75vw;
      max-width: 1024px;
    `;
  }),
  FAQList: styled.ul(() => {
    return css`
      margin: 0;
      padding: 0;
      font-size: 1rem;
      list-style: none;
    `;
  }),
  FAQItem: styled.li(() => {
    return css`
      border-bottom: 1px dashed #eee;
    `;
  }),
  FAQQ: styled.div(() => {
    return css`
      font-size: 1.3rem;
      font-weight: 500;
      padding-bottom: 0.4rem;
    `;
  }),
  FAQA: styled.p(() => {
    return css``;
  }),
  Marker: styled.span(() => {
    return css`
      background-color: #faed27;
      color: #000;
      display: inline-block;
      padding: 0 4px;
    `;
  }),
};
