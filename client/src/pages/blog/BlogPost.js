// BlogPost.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogPost } from '../../services/blogService';
import ContentBlock from '../../components/blog/ContentBlock';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchBlogPost(slug);
        setPost(data); // data is the post object
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
        setError(error.message);
      }
    };

    loadPost();
  }, [slug]);

  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!post) return <div className="text-center mt-8">Loading...</div>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>
      <p className="text-gray-600 mb-4">{post.attributes.publishDate}</p>
      {post.attributes.coverImage?.data && (
        <img
          src={post.attributes.coverImage.data.attributes.url}
          alt={post.attributes.title}
          className="w-full h-64 object-cover mb-8"
        />
      )}
      {post.attributes.content.map((block) => (
        <ContentBlock key={block.id} block={block} />
      ))}
    </article>
  );
};

export default BlogPost;
