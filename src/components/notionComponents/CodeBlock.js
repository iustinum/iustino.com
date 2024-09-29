import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ content }) => {
  return (
    <SyntaxHighlighter language={content.language} style={tomorrow}>
      {content.rich_text[0].plain_text}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;