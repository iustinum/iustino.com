import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EXIF from "exif-js";

const Art = () => {
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

  const parseDate = (dateString) => {
    if (!dateString) return null;

    // For EXIF date format: YYYY:MM:DD HH:MM:SS
    const exifMatch = dateString.match(/^(\d{4}):(\d{2}):/);
    if (exifMatch) {
      return { year: parseInt(exifMatch[1]), month: parseInt(exifMatch[2]) };
    }

    // For standard date format (from last-modified header)
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return { year: date.getFullYear(), month: date.getMonth() + 1 };
    }

    return null;
  };

  const getImageDate = (imagePath) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imagePath;
      img.onload = function () {
        EXIF.getData(this, function () {
          const dateTimeOriginal = EXIF.getTag(this, "DateTimeOriginal");
          if (dateTimeOriginal) {
            const parsedDate = parseDate(dateTimeOriginal);
            if (parsedDate) {
              resolve(parsedDate);
              return;
            }
          }
          // Fallback to last modified date
          fetch(imagePath, { method: "HEAD" })
            .then((response) => {
              const lastModified = response.headers.get("last-modified");
              resolve(parseDate(lastModified));
            })
            .catch(() => resolve(null));
        });
      };
      img.onerror = () => resolve(null);
    });
  };

  const fetchAlbums = async () => {
    try {
      const context = require.context(
        "../assets/images",
        true,
        /\.(jpg|jpeg)$/
      );
      const paths = context.keys();

      const albumFolders = [
        ...new Set(
          paths.map((path) => {
            const parts = path.split("/");
            return parts.length > 2 ? parts[1] : null;
          })
        ),
      ].filter((folder) => folder !== null);

      const albumsData = albumFolders.map((folder) => ({
        name: folder,
        path: `/assets/images/${folder}`,
      }));

      setAlbums(albumsData);

      const images = {};
      const dates = {};
      for (const folder of albumFolders) {
        const folderImages = paths.filter((path) =>
          path.startsWith(`./${folder}/`)
        );
        if (folderImages.length > 0) {
          const coverImage = folderImages.find((path) =>
            path.endsWith("/cover.jpg")
          );
          const imagePath = coverImage || folderImages[0];
          const image = await import(`../assets/images/${imagePath.slice(2)}`);
          images[folder] = image.default;

          // Process all images in the folder to find the most recent date
          // TODO: Optimization
          let mostRecentDate = null;
          for (const imgPath of folderImages) {
            const imgModule = await import(
              `../assets/images/${imgPath.slice(2)}`
            );
            const imgDate = await getImageDate(imgModule.default);
            if (
              imgDate &&
              (!mostRecentDate ||
                imgDate.year > mostRecentDate.year ||
                (imgDate.year === mostRecentDate.year &&
                  imgDate.month > mostRecentDate.month))
            ) {
              mostRecentDate = imgDate;
            }
          }

          if (mostRecentDate) {
            dates[folder] = mostRecentDate;
          }
        }
      }
      setAlbumImages(images);
      setAlbumDates(dates);

      if (albumFolders.length > 0 && images[albumFolders[0]]) {
        setDefaultImage(images[albumFolders[0]]);
      }
    } catch (error) {
      console.error("Failed to fetch albums:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[date.month - 1].toUpperCase()} ${date.year}`;
  };

  // Sorting
  const sortAlbums = (albums, sortBy, sortOrder) => {
    return [...albums].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const dateA = albumDates[a.name] || { year: 0, month: 0 };
        const dateB = albumDates[b.name] || { year: 0, month: 0 };
        if (dateA.year !== dateB.year) {
          return sortOrder === "asc"
            ? dateA.year - dateB.year
            : dateB.year - dateA.year;
        }
        return sortOrder === "asc"
          ? dateA.month - dateB.month
          : dateB.month - dateA.month;
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
                  to={`/art/${album.name.replace(" ", "-")}`}
                  className="flex justify-between items-center text-lg"
                >
                  <span className="mr-8">{album.name.toUpperCase()}</span>
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

export default Art;
