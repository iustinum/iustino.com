import { marked } from "marked";
import parse from 'html-react-parser';

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
  const markdownRendered = marked(markdownContent);
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
      default:
        break;
    }
  
    return [postData, component];
  }

function processParagraph(node, markdownContent, sidenotes) {
  const imgElement = node.querySelector("img");
  if (imgElement) {
    const altText = imgElement.getAttribute("alt");
    if (altText === "cover") {
      return [{ coverImage: imgElement.getAttribute("src") }, null];
    } else {
      return [{}, (
        <img
          className="blog-post-image"
          src={imgElement.getAttribute("src")}
          alt={altText}
        />
      )];
    }
  } else {
    let textContent = node.innerHTML;
    textContent = processSidenotes(textContent, markdownContent, sidenotes);
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