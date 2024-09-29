import React from 'react';
import RichText from './RichText';
import NotionBlock from '../NotionBlock';

const NumberedList = ({ content, children, depth = 0, index = 1 }) => {
    const listStyles = ['decimal', 'lower-alpha', 'lower-roman'];
    const listStyle = listStyles[depth % listStyles.length];
  
    const listStyleMap = {
      decimal: 'list-decimal',
      'lower-alpha': 'list-lower-alpha',
      'lower-roman': 'list-lower-roman',
    };
  
    return (
      <ol className={`${listStyleMap[listStyle] || 'list-decimal'} list-inside my-2`} style={{ marginLeft: `${depth * 16}px`, listStyleType: listStyle }} start={index}>
        <li>
          {content.rich_text.map((text, idx) => (
            <RichText key={idx} text={text} />
          ))}
        </li>
        {children && children.map((child, idx) => (
          <NotionBlock key={child.id} block={child} depth={depth + 1} index={idx + 1} />
        ))}
      </ol>
    );
  };
  
  
  

export default NumberedList;