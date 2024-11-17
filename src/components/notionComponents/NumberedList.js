import React from "react";
import RichText from "./RichText.js";
import NotionBlock from "../NotionBlock.js";
import Equation from "./Equation.js";

const NumberedList = ({ content, children, depth = 0, index = 1 }) => {
  const listStyles = ["decimal", "lower-alpha", "lower-roman"];
  const listStyle = listStyles[depth % listStyles.length];

  const listStyleMap = {
    decimal: "list-decimal",
    "lower-alpha": "list-lower-alpha",
    "lower-roman": "list-lower-roman",
  };

  return (
    <ol
      className={`${
        listStyleMap[listStyle] || "list-decimal"
      } list-inside my-2`}
      style={{ marginLeft: `${depth * 16}px`, listStyleType: listStyle }}
      start={index}
    >
      <li>
        {content.rich_text.map((text, index) => {
          if (text.type === "equation") {
            return (
              <Equation key={index} content={text.equation} isInline={true} />
            );
          }
          return <RichText key={index} text={text} />;
        })}
      </li>
      {children &&
        children.map((child, idx) => (
          <NotionBlock
            key={child.id}
            block={child}
            depth={depth + 1}
            index={idx + 1}
          />
        ))}
    </ol>
  );
};

export default NumberedList;
