import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchManifest, getImageUrl } from '../utils/imageManifest';

//TODO: Lots of repetition with AlbumDetails, need refactoring
const AlbumGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [hoveredAlbum, setHoveredAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState({});
  const [albumDates, setAlbumDates] = useState({});
  const [defaultImage, setDefaultImage] = useState(null);

  //sorting
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [hoveredSort, setHoveredSort] = useState(null);
  

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const manifest = await fetchManifest();
      console.log('new manifest', manifest);
      
      const albumsData = manifest.map(album => ({
        name: album.name,
        path: `/${album.name}`,
      }));

      setAlbums(albumsData);

      const images = {};
      const dates = {};
      for (const album of manifest) {
        if (album.images.length > 0) {
          const coverImage = album.images.find(path => path.endsWith("cover.jpg")) || album.images[0];
          images[album.name] = getImageUrl(coverImage);
          dates[album.name] = album.date ? new Date(album.date) : null;
        }
      }
      setAlbumImages(images);
      setAlbumDates(dates);

      if (manifest.length > 0 && images[manifest[0].name]) {
        setDefaultImage(images[manifest[0].name]);
      }
    } catch (error) {
      console.error("Failed to fetch albums:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[date.getMonth()].toUpperCase()} ${date.getFullYear()}`;
  };

  const formatAlbumName = (name) => {
    return name.replace(/-/g, ' ').toUpperCase();
  };

  // Sorting
  const sortAlbums = (albums, sortBy, sortOrder) => {
    return [...albums].sort((a, b) => {
      if (sortBy === "name") {
        // Name sorting remains the same
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const dateA = albumDates[a.name];
        const dateB = albumDates[b.name];
        if (!dateA && !dateB) return 0;
        if (!dateA) return sortOrder === "asc" ? 1 : -1;
        if (!dateB) return sortOrder === "asc" ? -1 : 1;
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
    });
  };

  const handleSort = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  const sortedAlbums = sortAlbums(albums, sortBy, sortOrder);

  return (
    <div className="flex h-screen">
      <div className="flex w-3/4 bg-gray-100 items-center justify-center p-8">
        {(hoveredAlbum && albumImages[hoveredAlbum]) || defaultImage ? (
          <motion.img
            src={hoveredAlbum ? albumImages[hoveredAlbum] : defaultImage}
            alt={hoveredAlbum || "Default"}
            className="max-w-[90%] max-h-[90%] object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : null}
      </div>
      <div className="flex w-1/4 bg-white items-center justify-center">
        <div>
          <div className="flex justify-between mb-4">
            <button
              className={`text-lg ${sortBy === "name" ? "font-bold" : ""} ${
                hoveredSort === "name" ? "font-bold" : ""
              }`}
              onClick={() => handleSort("name")}
              onMouseEnter={() => setHoveredSort("name")}
              onMouseLeave={() => setHoveredSort(null)}
            >
              SORT BY NAME
            </button>
            <button
              className={`text-lg ${sortBy === "date" ? "font-bold" : ""} ${
                hoveredSort === "date" ? "font-bold" : ""
              }`}
              onClick={() => handleSort("date")}
              onMouseEnter={() => setHoveredSort("date")}
              onMouseLeave={() => setHoveredSort(null)}
            >
              SORT BY DATE
            </button>
          </div>
          <ul>
            {sortedAlbums.map((album) => (
              <li
                key={album.name}
                className={`mb-2 cursor-pointer ${
                  hoveredAlbum === album.name ? "font-bold" : ""
                }`}
                onMouseEnter={() => setHoveredAlbum(album.name)}
                onMouseLeave={() => setHoveredAlbum(null)}
              >
                <Link
                  to={`/gallery/${album.name}`}
                  className="flex justify-between items-center text-lg"
                >
                  <span className="mr-8">{formatAlbumName(album.name)}</span>
                  <span className="text-gray-500 ml-8">
                    {formatDate(albumDates[album.name])}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlbumGallery;
