import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Equation = ({ content, isInline }) => {
  const MathComponent = isInline ? InlineMath : BlockMath;
  return <MathComponent math={content.expression} />;
};

export default Equation;