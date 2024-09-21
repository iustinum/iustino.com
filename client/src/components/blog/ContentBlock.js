import React from 'react';
import { getComponent } from './componentRegistry';

const ContentBlock = ({ block }) => {
  const Component = getComponent(block.__component);
  if (!Component) {
    console.warn(`No component found for type ${block.__component}`);
    return null;
  }

  // Exclude __component and id from props
  const { __component, id, ...rest } = block;

  return <Component key={id} {...rest} />;
};

export default ContentBlock;
