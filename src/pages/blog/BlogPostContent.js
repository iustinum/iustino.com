import React from "react";
import { format, parse } from "date-fns";

const BlogPostContent = ({ post, components }) => {
  // Parse the date string to a Date object
  const parsedDate = parse(post.date, 'MMM d, yyyy', new Date());

  return (
    <div className="flex flex-col items-center min-h-screen w-full py-28">
      <div className="w-full mx-auto px-16 max-w-5xl mb-[60px]">
        <div className="flex flex-col w-full">
          <h1 className="font-['Sohne-Halbfett'] text-7xl leading-none text-center">
            {post.title}
          </h1>
          {post.subtitle && (
            <h3 className="mt-4 text-3xl font-['Sohne-Halbfett'] text-center">
              {post.subtitle}
            </h3>
          )}
          <p className="mt-7 text-2xl font-['Sohne-Halbfett'] text-center">
            {format(parsedDate, "MMMM d, yyyy")}
          </p>
        </div>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt="Cover"
            className="object-cover w-full mt-8 max-h-[50vh]"
          />
        )}
      </div>
      <div className="w-full max-w-4xl mx-auto px-16 lg:max-w-5xl xl:max-w-5xl">
        {components.map((component, index) => (
          <div key={index} className="mb-6">
            {component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostContent;