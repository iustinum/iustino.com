import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { fetchManifest, getImageUrl } from '../utils/imageManifest';

const AlbumDetails = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [albumDate, setAlbumDate] = useState(null);
  const { albumName } = useParams();
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const fetchAlbumImages = async () => {
      try {
        const manifest = await fetchManifest();
        const album = manifest.find(a => a.name === albumName);
        if (album) {
          setImages(album.images.map(getImageUrl));
          setAlbumDate(album.date ? new Date(album.date) : null);
        }
      } catch (error) {
        console.error(`Failed to load images for ${albumName}:`, error);
      }
    };

    fetchAlbumImages();
  }, [albumName]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const formatAlbumName = (name) => {
    return name.replace(/-/g, ' ').toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "";
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[date.getMonth()].toUpperCase()} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-3/4 bg-gray-100 items-center justify-center p-8">
        {images.length > 0 && (
          <motion.img
            src={images[currentImageIndex]}
            alt={`${albumName} ${currentImageIndex + 1}`}
            className="max-w-[90%] max-h-[90%] object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>
      <div className="flex w-1/4 bg-white items-center justify-center">
        <div className="w-full px-4">
          <h2 className="text-2xl mb-4 font-bold">{formatAlbumName(albumName)}</h2>
          <p className="text-gray-500 mb-8">{formatDate(albumDate)}</p>
          <div className="flex justify-between mb-4 mx-8">
            <button
              className={`text-lg transition-all duration-200 ${hoveredButton === 'prev' ? 'font-bold' : ''}`}
              onClick={handlePrevImage}
              onMouseEnter={() => setHoveredButton('prev')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Previous
            </button>
            <button
              className={`text-lg transition-all duration-200 ${hoveredButton === 'next' ? 'font-bold' : ''}`}
              onClick={handleNextImage}
              onMouseEnter={() => setHoveredButton('next')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Next
            </button>
          </div>
          <p className="text-center">
            Image {currentImageIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;