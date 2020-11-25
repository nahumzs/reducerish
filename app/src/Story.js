import styled, { css } from "styled-components";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";

SyntaxHighlighter.registerLanguage("jsx", jsx);

export default function Story({ code, render }) {
  return (
    <styles.Container>
      <styles.Code>
        <SyntaxHighlighter language="jsx" style={prism}>
          {code}
        </SyntaxHighlighter>
      </styles.Code>
      <styles.Render>{render}</styles.Render>
    </styles.Container>
  );
}

const styles = {
  Container: styled.div(() => {
    return css`
      width: 100%;
      display: flex;
      border: 1px solid #ccc;
      padding: 4px 8px;
      border-radius: 4px;
    `;
  }),
  Code: styled.div(() => {
    return css`
      width: 75%;
      flex-shrink: 0;
    `;
  }),
  Render: styled.div(() => {
    return css`
      width: 25%;
      padding: 32px;
    `;
  }),
};
