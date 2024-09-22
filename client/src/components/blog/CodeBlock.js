import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ content }) => {
  const match = content.match(/```(\w+)\n([\s\S]+?)```/);
  const language = match ? match[1] : 'text';
  const code = match ? match[2].trim() : content;

  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;