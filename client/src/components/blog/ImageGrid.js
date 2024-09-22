import React from 'react';

const ImageGrid = ({ images }) => {
  const gridClass =
    images.length === 1
      ? 'grid-cols-1'
      : images.length === 2
      ? 'grid-cols-2'
      : 'grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-4 mb-8`}>
      {images.map((img) => (
        <div key={img.id} className="relative self-start">
          <img
            src={img.content.data.attributes.url}
            alt={img.content.data.attributes.alternativeText || ''}
            className="w-full h-auto object-cover block"
          />
          {img.caption && (
            <p
              className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white italic p-2 text-sm inline-block"
              style={{ margin: 0 }}
            >
              {img.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
