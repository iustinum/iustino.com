import React from 'react';

const Image = ({ content, inColumnList = false }) => {
  const imageClass = inColumnList
    ? 'w-full h-auto'
    : 'w-full h-auto max-h-[30vh] object-contain';

  return (
    <figure className="my-4">
      <img 
        src={content.file.url} 
        alt={content.caption ? content.caption[0]?.plain_text : 'Image'} 
        className={imageClass}
      />
      {content.caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-2">
          {content.caption[0]?.plain_text}
        </figcaption>
      )}
    </figure>
  );
};

export default Image;