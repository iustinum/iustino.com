import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion as m } from 'framer-motion';

const BlogLanding = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const context = require.context('./posts', false, /\.md$/);
      const posts = context.keys().map((filename) => {
        const slug = filename.replace(/^.*[\\\/]/, '').slice(0, -3);
        return {
          filename,
          slug,
        };
      });
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="container">
      <div className="w-full max-w-4xl mx-auto mt-8">
        <h1 className="text-[#F7CC90] text-[40px] font-normal">Blog Posts</h1>
        {posts.map(post => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="block mt-4 text-[#F7CC90] text-[24px] font-normal hover:underline">
            {post.slug.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </m.div>
  );
};

export default BlogLanding;
