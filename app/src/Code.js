import styled, { css } from "styled-components";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";

SyntaxHighlighter.registerLanguage("jsx", jsx);

export default function Code({ code, children }) {
  return (
    <styles.Container>
      <SyntaxHighlighter language="jsx" style={prism}>
        {code || children}
      </SyntaxHighlighter>
    </styles.Container>
  );
}

const styles = {
  Container: styled.div(() => {
    return css`
      width: 100%;
      border: 1px solid #ccc;
      padding: 4px 8px;
      border-radius: 4px;
    `;
  }),
};
