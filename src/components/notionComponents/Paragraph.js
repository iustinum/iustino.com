import React from 'react';
import RichText from './RichText.js';
import Equation from './Equation.js';

const Paragraph = ({ content }) => {
  return (
    <p className="my-2">
      {content.rich_text.map((text, index) => {
        if (text.type === 'equation') {
          return <Equation key={index} content={text.equation} isInline={true} />;
        }
        return <RichText key={index} text={text} />;
      })}
    </p>
  );
};

export default Paragraph;