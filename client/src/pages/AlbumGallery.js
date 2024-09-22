import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchManifest, getImageUrl } from "../utils/imageManifest";

const AlbumGallery = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const manifest = await fetchManifest();

        const albumsData = manifest.map((album) => ({
          title: album.albumTitle,
          lastUpdated: album.lastUpdated,
          coverImage: getAlbumCoverImage(album),
        }));

        setAlbums(albumsData);
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const getAlbumCoverImage = (album) => {
    const imageKeys = Object.keys(album.images);
    if (imageKeys.length > 0) {
      const coverImagePath = imageKeys.find((path) =>
        path.endsWith("cover.jpg")
      );
      const defaultImagePath = imageKeys.find((path) =>
        path.endsWith("default.jpg")
      );
      return getImageUrl(coverImagePath || defaultImagePath || imageKeys[0]);
    }
    return null;
  };

  const formatAlbumName = (name) => {
    return name.replace(/-/g, " ").toUpperCase();
  };

  return (
    <div className="container mx-auto px-16 py-32 overflow-y-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {albums.map((album) => (
          <Link
            key={album.title}
            to={`/gallery/${album.title}`}
            className="relative overflow-hidden group"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-w-16 aspect-h-9"
            >
              <img
                src={album.coverImage}
                alt={formatAlbumName(album.title)}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-3xl font-bold text-center px-4 transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                  {formatAlbumName(album.title)}
                </h2>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlbumGallery;
