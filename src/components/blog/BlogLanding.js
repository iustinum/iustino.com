import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import { marked } from "marked";

const BlogLanding = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const markdownFiles = require.context("./posts", false, /\.md$/);
      const posts = await Promise.all(
        markdownFiles.keys().map(async (filename) => {
          const markdown = await fetch(markdownFiles(filename)).then((res) =>
            res.text()
          );
          const markdownRendered = marked(markdown);
          const slug = filename.slice(2, -3);

          // Parse the rendered HTML to extract relevant parts
          const parser = new DOMParser();
          const doc = parser.parseFromString(markdownRendered, "text/html");
          const title = doc.querySelector("h1")?.textContent || "";
          const subtitle = doc.querySelector("h2")?.textContent || "";
          const date = doc.querySelector("h3")?.textContent || "";
          const imageElement = doc.querySelector("img");
          const image = imageElement ? imageElement.src : "";

          return {
            slug,
            title,
            subtitle,
            date,
            image,
          };
        })
      );
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(posts); // Reverse the order of the posts array
    };

    fetchPosts();
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="blog-landing-content"
    >
      <div className="blog-landing-header">
        <div className="blog-landing-header-container">
          <div className="blog-section-text-area ">
            <h1 className="title">Blog</h1>
          </div>
        </div>
      </div>

      {posts.map((post, index) => (
        <div key={post.slug} className={`blog-section pt-[90px] justify-center ${index === posts.length - 1 ? 'mb-[90px]' : ''}`}>
          <div className="blog-section-container border-t border-black pt-8 w-full">
            <div className="blog-section-text-area mr-16">
              <Link to={`/blog/${post.slug}`} className="title-2 pb-8 hover:underline">
                <h2>{post.title}</h2>
              </Link>
              <p className="text-[18px] mb-8 font-bold">{post.date}</p>
              <p className="text-[18px] mb-8">{post.subtitle}</p>
            </div>
            {post.image && (
              <img
                className="blog-landing-image ml-8"
                src={post.image}
                alt={post.title}
              />
            )}
          </div>
        </div>
      ))}
    </m.div>
  );
};

export default BlogLanding;