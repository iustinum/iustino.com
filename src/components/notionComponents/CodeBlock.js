import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism/index.js";

const CodeBlock = ({ content }) => {
  return (
    <SyntaxHighlighter
      language={content.language}
      style={tomorrow}
      customStyle={{
        fontSize: "14px",
        lineHeight: "1.5",
      }}
    >
      {content.rich_text[0].plain_text}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
