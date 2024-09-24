import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import parse from 'html-react-parser';
import React from 'react';


// marked.setOptions({
//   sanitize: false, // Allow HTML tags
//   gfm: true,       // Enable GitHub Flavored Markdown
// });


export function processSidenotes(textContent, markdownContent, sidenotes) {
  const sidenoteRegex = /\[\^(\d+)\]/g;
  let match;

  while ((match = sidenoteRegex.exec(textContent)) !== null) {
    const index = match[1];
    const sidenoteContent = markdownContent
      .split("\n")
      .find((line) => line.startsWith(`[^${index}]: `));
    if (sidenoteContent) {
      sidenotes[index] = sidenoteContent.replace(`[^${index}]: `, "");
      textContent = textContent.replace(sidenoteContent, "");
    }
    textContent = textContent.replace(match[0], `<sup>${index}</sup>`);
  }

  return textContent;
}

export function parseMarkdown(markdownContent) {
  // Configure marked to use the KaTeX extension
  marked.use(markedKatex({
    throwOnError: false, // Don't throw errors for invalid LaTeX
    errorColor: '#cc0000', // Color for rendering errors
  }));

  // Preprocess the markdown content if needed (e.g., image grids)
  const processedMarkdown = processImageGrids(markdownContent);

  const markdownRendered = marked(processedMarkdown);
  const parser = new DOMParser();
  return parser.parseFromString(markdownRendered, "text/html");
}



export function parseHtml(parsedHtml, markdownContent) {
  let post = { title: "", subtitle: "", date: "", coverImage: "" };
  const components = [];

  parsedHtml.body.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const [postData, component] = processNode(node, markdownContent);
      post = { ...post, ...postData };
      if (component) {
        components.push(component);
      }
    }
  });

  return [post, components];
}

function processNode(node, markdownContent) {
  const tagName = node.tagName.toLowerCase();
  let postData = {};
  let component = null;

  switch (tagName) {
    case "h1":
      postData.title = node.textContent;
      break;
    case "h2":
      postData.subtitle = node.textContent;
      break;
    case "h3":
      postData.date = node.textContent;
      break;
    case "p":
      [postData, component] = processParagraph(node, markdownContent);
      break;
    case "ol":
    case "ul":
      component = processList(node, tagName, markdownContent);
      break;
    case "blockquote":
      component = processBlockquote(node, markdownContent);
      break;
    case "div":
    case "span":
      if (node.classList.contains("katex-display")) {
        // Center the block equations
        component = (
          <div className="text-center my-4">
            <span dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
          </div>
        );
      } else if (node.classList.contains("katex")) {
        // Handle inline math (if needed)
        component = <span dangerouslySetInnerHTML={{ __html: node.outerHTML }} />;
      } else if (node.classList.contains("image-grid")) {
        component = processImageGrid(node);
      } else {
        // Process child nodes
        const childComponents = Array.from(node.childNodes).map((childNode) =>
          processNode(childNode, markdownContent)[1]
        );
        component = <div>{childComponents}</div>;
      }
      break;
    default:
      // For other tags, process their children
      const childComponents = Array.from(node.childNodes).map((childNode) =>
        processNode(childNode, markdownContent)[1]
      );
      component = React.createElement(tagName, null, childComponents);
      break;
  }

  return [postData, component];
}


function processImageGrid(node) {
  const imgElements = node.querySelectorAll("img");
  const images = Array.from(imgElements).map((img) => ({
    src: img.getAttribute("src"),
    alt: img.getAttribute("alt") || '',
    title: img.getAttribute("title") || '',
  }));

  // Determine the number of columns (max 4)
  const numImages = images.length;
  const numColumns = Math.min(numImages, 4);

  // Map number of columns to Tailwind grid classes
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  // Get the appropriate class based on the number of columns
  const gridClass = gridClasses[numColumns];

  // Use CSS variable to set max-height for images
  const maxHeight = '30vh';

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {images.map((image, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="w-full flex items-center justify-center"
            style={{ maxHeight }}
          >
            <img
              className="max-h-full w-auto"
              src={image.src}
              alt={image.alt}
            />
          </div>
          {image.title && (
            <div className="text-sm text-center mt-2">
              {image.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}






function processImageGrids(markdownContent) {
  return markdownContent.replace(
    /<image-grid>([\s\S]*?)<\/image-grid>/g,
    (match, content) => {
      // Parse the content inside image-grid as Markdown
      const innerHtml = marked(content);
      // Wrap the parsed content in a div with a unique class
      return `<div class="image-grid">${innerHtml}</div>`;
    }
  );
}




function processParagraph(node, markdownContent) {
  const imgElement = node.querySelector("img");
  if (imgElement) {
    const altText = imgElement.getAttribute("alt");
    if (altText === "cover") {
      // Set the cover image in the post data
      return [{ coverImage: imgElement.getAttribute("src") }, null];
    } else {
      // Render other images with max height and aspect ratio maintained
      return [{}, (
        <img
          className="max-h-[30vh] w-auto h-auto object-contain"
          src={imgElement.getAttribute("src")}
          alt={altText}
        />
      )];
    }
  } else {
    let textContent = node.innerHTML;
    textContent = processSidenotes(textContent, markdownContent);

    return [{}, (
      <p className="text-[18px]">
        {parse(textContent)}
      </p>
    )];
  }
}




function processList(node, tagName, markdownContent, sidenotes) {
  const listItems = Array.from(node.querySelectorAll("li")).map(
    (li) => {
      let listItemContent = li.innerHTML;
      listItemContent = processSidenotes(listItemContent, markdownContent, sidenotes);
      return <li className="text-[18px]">{parse(listItemContent)}</li>;
    }
  );
  const ListComponent = tagName === "ol" ? "ol" : "ul";
  return (
    <ListComponent
      className={`${
        tagName === "ol" ? "list-decimal" : "list-disc"
      } pl-8 my-[18px]`}
    >
      {listItems}
    </ListComponent>
  );
}

function processBlockquote(node, markdownContent, sidenotes) {
  let blockquoteContent = node.innerHTML;
  blockquoteContent = processSidenotes(blockquoteContent, markdownContent, sidenotes);
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-[18px]">
      {parse(blockquoteContent)}
    </blockquote>
  );
}