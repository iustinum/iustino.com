import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Art = () => {
  const [albums, setAlbums] = useState([]);
  const [hoveredAlbum, setHoveredAlbum] = useState(null);
  const [firstImages, setFirstImages] = useState({});
  const [defaultImage, setDefaultImage] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const context = require.context('../assets/images', true, /\.jpg$/);
      const paths = context.keys();
      
      // Filter out non-folder items
      const albumFolders = [...new Set(paths.map(path => {
        const parts = path.split('/');
        return parts.length > 2 ? parts[1] : null;
      }))].filter(folder => folder !== null);

      const albumsData = albumFolders.map(folder => ({
        name: folder,
        path: `/assets/images/${folder}`
      }));
      
      setAlbums(albumsData);

      const images = {};
      for (const folder of albumFolders) {
        const folderImages = paths.filter(path => path.startsWith(`./${folder}/`));
        if (folderImages.length > 0) {
            const coverImage = folderImages.find(path => path.endsWith('/cover.jpg'));
            const imagePath = coverImage || folderImages[0];
            const image = await import(`../assets/images/${imagePath.slice(2)}`);
            images[folder] = image.default;

            
          const firstImage = await import(`../assets/images/${folderImages[0].slice(2)}`);
          images[folder] = firstImage.default;
        }
      }
      setFirstImages(images);

      // Set default image
      if (albumFolders.length > 0 && images[albumFolders[0]]) {
        setDefaultImage(images[albumFolders[0]]);
      }
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-3/4 bg-gray-100 items-center justify-center p-8">
        {(hoveredAlbum && firstImages[hoveredAlbum]) || defaultImage ? (
          <motion.img 
            src={hoveredAlbum ? firstImages[hoveredAlbum] : defaultImage}
            alt={hoveredAlbum || 'Default'}
            className="max-w-[90%] max-h-[90%] object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : null}
      </div>
      <div className="flex w-1/4 bg-white items-center justify-center">
        <ul>
          {albums.map((album) => (
            <li 
              key={album.name}
              className={`mb-2 cursor-pointer ${hoveredAlbum === album.name ? 'font-bold' : ''}`}
              onMouseEnter={() => setHoveredAlbum(album.name)}
              onMouseLeave={() => setHoveredAlbum(null)}
            >
              <Link to={`/art/${album.name.replace(' ', '-')}`}>
                {album.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Art;