import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogPosts, parseNotionBlocks } from '../services/notion.js';
import NotionBlock from '../components/NotionBlock.js';
import { format, parseISO } from 'date-fns';

const BlogDetail = () => {
  const [post, setPost] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const loadPost = async () => {
      const posts = await fetchBlogPosts();
      const currentPost = posts.find(p => p.slug === slug);
      setPost(currentPost);

      if (currentPost) {
        const response = await fetch(`/api/blocks/${currentPost.id}/children`);
        const data = await response.json();
        const parsedBlocks = await parseNotionBlocks(data.results);
        setBlocks(parsedBlocks);
      }
    };

    loadPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  let numberedListIndex = 1; // Initialize a separate counter for numbered list items

  return (
    <div className="flex flex-col items-center min-h-screen w-full py-28">
      <div className="w-full mx-auto px-16 max-w-5xl mb-[60px]">
        <div className="flex flex-col w-full">
          <h1 className="font-['Sohne-Halbfett'] text-7xl leading-none text-center">
            {post.title}
          </h1>
          {post.excerpt && (
            <h3 className="mt-4 text-3xl font-['Sohne-Halbfett'] text-center">
              {post.excerpt}
            </h3>
          )}
          <p className="mt-7 text-2xl font-['Sohne-Halbfett'] text-center">
            {format(parseISO(post.publishDate), "MMMM d, yyyy")}
          </p>
        </div>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="object-cover w-full mt-8 max-h-[50vh]"
          />
        )}
      </div>
      <div className="w-full max-w-4xl mx-auto px-16 lg:max-w-5xl xl:max-w-5xl">
        {blocks.map((block) => {
          // Only increment index for numbered list items
          if (block.type === 'numbered_list_item') {
            const blockElement = (
              <div key={block.id} className="mb-6">
                <NotionBlock block={block} index={numberedListIndex} /> {/* Pass the counter */}
              </div>
            );
            numberedListIndex += 1; // Increment the counter only for numbered list items
            return blockElement;
          }
          
          // For other block types, just render normally without incrementing the index
          return (
            <div key={block.id} className="mb-6">
              <NotionBlock block={block} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogDetail;
