import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import { format, parseISO } from "date-fns";
import { fetchBlogPosts } from "../services/notion.js";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchBlogPosts();
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                {format(parseISO(post.publishDate), "MMM d, yyyy")}
              </p>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
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

export default BlogList;