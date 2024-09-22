import React from 'react';
import ReactMarkdown from 'react-markdown';

const TextBlock = ({ content }) => {
  const components = {
    h1: ({ children, ...props }) => <h1 className="text-4xl font-bold mb-4 mt-8" {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 className="text-3xl font-semibold mb-3 mt-6" {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 className="text-2xl font-medium mb-2 mt-4" {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p className="text-lg mb-8 leading-snug" {...props}>{children}</p>,
    ul: ({ children, ...props }) => <ul className="text-lg list-disc list-inside mb-4 ml-4 leading-none" {...props}>{children}</ul>,
    ol: ({ children, ...props }) => <ol className="text-lg list-decimal list-inside mb-4 ml-4 leading-tight" {...props}>{children}</ol>,
    li: ({ children, ...props }) => <li className="mb-2" {...props}>{children}</li>,
    a: ({ children, ...props }) => <a className="underline decoration-black decoration-1 underline-offset-2 hover:bg-black hover:text-white transition-colors duration-300" {...props}>{children}</a>,
    blockquote: ({ children, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-10" {...props}>{children}</blockquote>,
  };

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
};

export default TextBlock;
