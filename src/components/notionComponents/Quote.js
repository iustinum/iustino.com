import React from 'react';
import RichText from './RichText.js';

const Quote = ({ content }) => {
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
      {content.rich_text.map((text, index) => (
        <RichText key={index} text={text} />
      ))}
    </blockquote>
  );
};

export default Quote;