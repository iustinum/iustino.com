import TextBlock from './TextBlock';
import CodeBlock from './CodeBlock';
import ImageGrid from './ImageGrid';

const componentRegistry = {
  'primitives.text-block': TextBlock,
  'primitives.code': CodeBlock,
  'composites.image-grid': ImageGrid,
};

export const getComponent = (type) => {
  return componentRegistry[type] || null;
};

export const registerComponent = (type, component) => {
  componentRegistry[type] = component;
};