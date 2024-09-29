import React from 'react';

const RichText = ({ text }) => {
  if (!text || !text.text) {
    return null;
  }

  const { annotations, href } = text;
  let className = '';

  if (annotations.bold) className += 'font-bold ';
  if (annotations.italic) className += 'italic ';
  if (annotations.strikethrough) className += 'line-through ';
  if (annotations.underline) className += 'underline ';
  if (annotations.code) className += 'font-mono bg-gray-100 rounded px-1 ';

  const content = text.text.content;

  if (href) {
    return <a href={href} className={`${className} text-blue-600 hover:underline`}>{content}</a>;
  }

  return <span className={className}>{content}</span>;
};

export default RichText;