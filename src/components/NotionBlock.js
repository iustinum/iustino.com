import React from 'react';
import Heading1 from './notionComponents/Heading1.js';
import Heading2 from './notionComponents/Heading2.js';
import Heading3 from './notionComponents/Heading3.js';
import Paragraph from './notionComponents/Paragraph.js';
import Image from './notionComponents/Image.js';
import CodeBlock from './notionComponents/CodeBlock.js';
import BulletedList from './notionComponents/BulletedList.js';
import NumberedList from './notionComponents/NumberedList.js';
import Quote from './notionComponents/Quote.js';
import Equation from './notionComponents/Equation.js';

const componentMap = {
  heading_1: Heading1,
  heading_2: Heading2,
  heading_3: Heading3,
  paragraph: Paragraph,
  image: Image,
  code: CodeBlock,
  bulleted_list_item: BulletedList,
  numbered_list_item: NumberedList,
  quote: Quote,
  equation: Equation,
};

const NotionBlock = ({ block, depth = 0, index = 1 }) => {
    if (block.type === 'column_list') {
      const columnCount = block.children.length;
      const columnWidth = `${100 / columnCount}%`;
      return (
        <div className="flex flex-wrap -mx-2">
          {block.children.map((column, idx) => (
            <div key={idx} className="px-2" style={{ width: columnWidth }}>
              {column.children.map((child) => (
                <NotionBlock key={child.id} block={child} inColumnList={true} />
              ))}
            </div>
          ))}
        </div>
      );
    }
  
    const Component = componentMap[block.type];
  
    if (!Component) {
      console.warn(`Unsupported block type: ${block.type}`);
      return null;
    }
  
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      return <Component content={block.content} children={block.children} depth={depth} index={index} />;
    }
  
    if (block.type === 'image') {
      return <Component content={block.content} inColumnList={block.inColumnList} />;
    }
  
    return <Component content={block.content} />;
  };

export default NotionBlock;