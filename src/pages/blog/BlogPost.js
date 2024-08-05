import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { parseMarkdown, parseHtml } from "../../utils/markdownUtils";
import BlogPostContent from "./BlogPostContent";

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [components, setComponents] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchMarkdownPost = async () => {
      try {
        const markdownFile = await import(`./posts/${slug}.md`);
        const response = await fetch(markdownFile.default);
        const markdownContent = await response.text();

        const parsedHtml = parseMarkdown(markdownContent);
        const [postData, parsedComponents] = parseHtml(parsedHtml, markdownContent);

        setPost(postData);
        setComponents(parsedComponents);
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

  return <BlogPostContent post={post} components={components} />;
};

export default BlogPost;