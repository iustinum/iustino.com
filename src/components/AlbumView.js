import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AlbumView = () => {
  const [images, setImages] = useState([]);
  const { albumName } = useParams();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const context = require.context('../assets/images', true, /\.jpg$/);
        const paths = context.keys().filter(path => path.startsWith(`./${albumName.replace('-', ' ')}/`));
        
        const loadedImages = await Promise.all(
          paths.map(async (path) => {
            const image = await import(`../assets/images/${path.slice(2)}`);
            return image.default;
          })
        );

        setImages(loadedImages);
      } catch (error) {
        console.error(`Failed to load images for ${albumName}:`, error);
      }
    };

    fetchImages();
  }, [albumName]);

  return (
    <div className="w-full p-8">
      <h2 className="text-2xl mb-4">{albumName.toUpperCase().replace('-', ' ')}</h2>
      <div className="space-y-8">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center">
            <img 
              src={image} 
              alt={`${albumName} ${index + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumView;