import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogPost } from "../../services/blogService";
import ContentBlock from "../../components/blog/ContentBlock";
import { parseISO, format } from "date-fns";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchBlogPost(slug);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        setError(error.message);
      }
    };

    loadPost();
  }, [slug]);

  if (error)
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!post) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen w-full py-28">
      <div className="w-full mx-auto px-16 max-w-5xl mb-[60px]">
        <div className="flex flex-col w-full">
          <h1 className="font-['Sohne-Halbfett'] text-7xl leading-none text-center">
            {post.attributes.title}
          </h1>
          <p className="mt-7 text-2xl font-['Sohne-Halbfett'] text-center">
            {format(parseISO(post.attributes.publishDate), "MMMM d, yyyy")}
          </p>
        </div>
        {post.attributes.coverImage?.data && (
          <img
            src={post.attributes.coverImage.data.attributes.url}
            alt={post.attributes.title}
            className="object-cover w-full mt-8 max-h-[50vh]"
          />
        )}
      </div>
      <div className="w-full max-w-4xl mx-auto px-16 lg:max-w-5xl xl:max-w-5xl">
        {post.attributes.content.map((block) => (
          <ContentBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
