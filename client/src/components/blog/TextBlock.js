import React from 'react';
import ReactMarkdown from 'react-markdown';

const TextBlock = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default TextBlock;