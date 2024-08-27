import React from "react";

const BlogPostContent = ({ post, components }) => {
  return (
    <div className="blog-post-content">
      <div className="blog-post-header">
        <div className="blog-post-header-text-area">
          <h1 className="title">{post.title}</h1>
          <h3 className="title-3">{post.subtitle}</h3>
          <h4 className="date">{post.date}</h4>
        </div>
        <img className="blog-post-cover" src={post.coverImage} alt="Cover" />
      </div>

      <div className="blog-post-body">
        <div className="blog-post-body-container mb-[90px]">
          {components.map((component) => (
            <div className="py-4">{component}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostContent;
