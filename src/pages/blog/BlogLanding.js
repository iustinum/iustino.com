import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import { marked } from "marked";
import { format, parse } from "date-fns";

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
          const dateString = doc.querySelector("h3")?.textContent || "";
          const imageElement = doc.querySelector("img");
          const image = imageElement ? imageElement.src : "";

          // Parse the date string
          const parsedDate = parse(dateString, 'MMM d, yyyy', new Date());

          return {
            slug,
            title,
            subtitle,
            date: parsedDate,
            image,
          };
        })
      );
      posts.sort((a, b) => b.date - a.date);
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.slug} className="bg-white shadow-md rounded-lg overflow-hidden">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                {format(post.date, "MMM d, yyyy")}
              </p>
              <p className="text-gray-700 mb-4">{post.subtitle}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="underline decoration-black decoration-1 underline-offset-2 hover:bg-black hover:text-white transition-colors duration-300"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogLanding;