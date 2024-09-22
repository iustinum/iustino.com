import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBlogPosts } from "../../services/blogService";
import { parseISO, format } from "date-fns";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchBlogPosts();
        const sortedPosts = response.data.sort((a, b) => {
          return parseISO(b.attributes.publishDate) - parseISO(a.attributes.publishDate);
        });
        setPosts(sortedPosts);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {post.attributes.coverImage?.data && (
              <img
                src={
                  post.attributes.coverImage.data.attributes.formats.small.url
                }
                alt={post.attributes.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {post.attributes.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {format(parseISO(post.attributes.publishDate), "MMM d, yyyy")}
              </p>
              <p className="text-gray-700 mb-4">{post.attributes.excerpt}</p>
              <Link
                to={`/blog/${post.attributes.slug}`}
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
