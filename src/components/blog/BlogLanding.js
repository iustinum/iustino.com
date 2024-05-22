import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import post1 from "../../assets/images/post-1.jpg";
import post2 from "../../assets/images/post-2.jpg";
import post3 from "../../assets/images/post-3.jpg";

const BlogLanding = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const context = require.context("./posts", false, /\.md$/);
      const posts = context.keys().map((filename) => {
        const slug = filename.replace(/^.*[\\\/]/, "").slice(0, -3);
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
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="blog-content"
    >
      <div className="blog-section pt-[160px]">
        <div className="blog-section-container">
          <div className="blog-section-text-area">
            <h1 className="title">Blog</h1>
          </div>
        </div>
      </div>

      <div className="blog-section pt-[90px]">
        <div className="blog-section-container">
          <div className="blog-section-text-area border-t border-black pt-8">
            <h2 className="title-2 pb-8">Example Post 1</h2>
            <div className="w-1/2 ml-2">
              <p className="text-[18px] mb-8">
                Hi. I'm Justin, a CS and Business major at UC Berkeley. My
                interests range from full-stack development to trading. I also
                have a strong fascination with data science and its application
                across various fields, particularly within the healthcare
                industry.
              </p>

              <p className="text-[18px] mb-8">
                My goal is to use my engineering skills to start my own
                business. I want to develop tools to democratize AI adoption in
                developing countries.
              </p>

              <p className="text-[18px] mb-8">
                I used to swim competitively and have entertained with the idea
                of becoming a professional swimmer. Currently, I run and swim to
                stay fit. I also like to try out new tech, learn about new tech
                frameworks, and work on my own projects. My most recent projects
                use Go and TypeScript. I'm also experimenting with Rust. Besides
                tech, I enjoy making music and experimenting with sound designs.
              </p>
            </div>
          </div>
          <img
          class="blog-landing-image sm:ml-8"
          src={post1}
          alt="Post 1"
        />
        </div>
      </div>









      <div className="w-full max-w-4xl mx-auto mt-8">
        <h1 className="text-[#F7CC90] text-[40px] font-normal">Blog Posts</h1>
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block mt-4 text-[#F7CC90] text-[24px] font-normal hover:underline"
          >
            {post.slug.replace(/-/g, " ")}
          </Link>
        ))}
      </div>
    </m.div>
  );
};

export default BlogLanding;
