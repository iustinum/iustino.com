import React from 'react';

const Heading1 = ({ content }) => {
  return <h1 className="text-3xl font-bold my-4">{content.rich_text[0].plain_text}</h1>;
};

export default Heading1;