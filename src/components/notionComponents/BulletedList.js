import React from 'react';
import RichText from './RichText.js';
import NotionBlock from '../NotionBlock.js';

const BulletedList = ({ content, children, depth = 0 }) => {
    const bulletStyles = ['disc', 'circle', 'square'];
    const bulletStyle = bulletStyles[depth % bulletStyles.length];
  
    const bulletStyleMap = {
      disc: 'list-disc',
      circle: 'list-circle',
      square: 'list-square',
    };
  
    return (
      <ul className={`${bulletStyleMap[bulletStyle] || 'list-disc'} list-inside my-2`} style={{ marginLeft: `${depth * 16}px`, listStyleType: bulletStyle }}>
        <li>
          {content.rich_text.map((text, index) => (
            <RichText key={index} text={text} />
          ))}
        </li>
        {children && children.map((child, index) => (
          <NotionBlock key={child.id} block={child} depth={depth + 1} />
        ))}
      </ul>
    );
  };
  

  

export default BulletedList;