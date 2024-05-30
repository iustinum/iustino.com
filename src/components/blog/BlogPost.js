import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion as m } from "framer-motion";
import { marked } from "marked";
import parse from 'html-react-parser';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [components, setComponents] = useState([]);
  const { slug } = useParams();

  function processSidenotes(textContent, markdownContent, sidenotes) {
    const sidenoteRegex = /\[\^(\d+)\]/g;
    let match;

    while ((match = sidenoteRegex.exec(textContent)) !== null) {
      const index = match[1];
      const sidenoteContent = markdownContent
        .split("\n")
        .find((line) => line.startsWith(`[^${index}]: `));
      if (sidenoteContent) {
        sidenotes[index] = sidenoteContent.replace(`[^${index}]: `, "");
        textContent = textContent.replace(sidenoteContent, ""); // Remove the sidenote definition from the content so it doesn't show up in component div again
      }
      textContent = textContent.replace(match[0], `<sup>${index}</sup>`); // adding superscript in div
    }

    return textContent;
  }

  useEffect(() => {
    const fetchMarkdownPost = async () => {
      try {
        const markdownFile = await import(`./posts/${slug}.md`);
        const response = await fetch(markdownFile.default);
        const markdownContent = await response.text();

        const markdownRendered = marked(markdownContent);
        const parser = new DOMParser();
        const doc = parser.parseFromString(markdownRendered, "text/html");

        let title = "";
        let subtitle = "";
        let date = "";
        let coverImage = "";
        const components = [];

        doc.body.childNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName.toLowerCase();
            let component = null;
            let sidenotes = {};

            switch (tagName) {
              case "h1":
                title = node.textContent;
                break;
              case "h2":
                subtitle = node.textContent;
                break;
              case "h3":
                date = node.textContent;
                break;
              case "p":
                const imgElement = node.querySelector("img");
                if (imgElement) {
                  const altText = imgElement.getAttribute("alt");
                  if (altText === "cover") {
                    coverImage = imgElement.getAttribute("src");
                  } else {
                    component = (
                      <img
                        className="blog-post-image"
                        src={imgElement.getAttribute("src")}
                        alt={altText}
                      />
                    );
                  }
                } else {
                  let textContent = node.innerHTML;
                  textContent = processSidenotes(
                    textContent,
                    markdownContent,
                    sidenotes
                  );
                  component = (
                    <p className="text-[18px]">
                        {parse(textContent)}
                    </p>
                  );
                }
                break;
              case "ol":
              case "ul":
                const listItems = Array.from(node.querySelectorAll("li")).map(
                  (li) => {
                    let listItemContent = li.innerHTML;
                    listItemContent = processSidenotes(listItemContent, markdownContent, sidenotes);
                    return <li className="text-[18px]">{parse(listItemContent)}</li>;
                  }
                );
                const ListComponent = tagName === "ol" ? "ol" : "ul";
                component = (
                  <ListComponent
                    className={`${
                      tagName === "ol" ? "list-decimal" : "list-disc"
                    } pl-8 my-[18px]`}
                  >
                    {listItems}
                  </ListComponent>
                );
                break;
              case "blockquote":
                let blockquoteContent = node.innerHTML;
                blockquoteContent = processSidenotes(blockquoteContent, markdownContent, sidenotes);
                component = (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-[18px]">
                    {parse(blockquoteContent)}
                  </blockquote>
                );
                break;
              default:
                break;
            }
            if (component) {
              components.push([component, sidenotes]);
            }
          }
        });

        setPost({ title, subtitle, date, coverImage });
        setComponents(components);
      } catch (err) {
        console.error("Failed to fetch markdown file", err);
        setPost(null);
        setComponents([]);
      }
    };

    fetchMarkdownPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="blog-post-content"
    >
      <div className="blog-post-header">
        <div className="blog-post-header-container">
          <div className="blog-post-header-text-area">
            <h1 className="title">{post.title}</h1>
            <h3 className="title-3">{post.subtitle}</h3>
            <h4 className="date">{post.date}</h4>
          </div>
          <img className="blog-post-cover" src={post.coverImage} alt="Cover" />
        </div>
      </div>

      <div className="blog-post-body">
        <div className="blog-post-body-container">
          {components.map(([component, sidenotes]) => (
            <div className="blog-post-body-component-container pb-[18px]">
              <div className="blog-post-body-component">{component}</div>
              <div className="blog-post-body-sidenote">
                {Object.entries(sidenotes).map(([index, content]) => (
                  <p key={index}>{`${index}: ${content}`}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </m.div>
  );
};

export default BlogPost;
