import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchManifest, getImageUrl } from "../utils/imageManifest.js";

const AlbumDetails = () => {
  const [albumData, setAlbumData] = useState(null);
  const { albumName } = useParams();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const manifest = await fetchManifest();
        const album = manifest.find((a) => a.albumTitle === albumName);
        if (album) {
          setAlbumData(album);
        }
      } catch (error) {
        console.error(`Failed to load data for ${albumName}:`, error);
      }
    };

    fetchAlbumData();
  }, [albumName]);

  if (!albumData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-16 py-32">
      {Object.entries(albumData.images).map(([imageKey, imageData], index) => (
        <div key={imageKey} className="mb-16 md:mb-32">
          <div className="flex flex-col md:flex-row md:space-x-16">
            <div className="w-full md:w-2/3 mb-8 md:mb-0">
              <motion.img
                src={getImageUrl(imageKey)}
                alt={`${albumName} ${index + 1}`}
                className="w-full h-auto object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="w-full md:w-1/3 flex flex-col">
              <div className="flex-grow text-right">
                {imageData.imageTitle && (
                  <p className="text-2xl md:text-4xl font-bold mb-2">
                    {imageData.imageTitle}
                  </p>
                )}
                {imageData.imageCaption && (
                  <p className="text-xl md:text-2xl italic mb-4">
                    {imageData.imageCaption}
                  </p>
                )}
                <p className="text-lg md:text-xl mb-1">
                  {imageData.formattedTime}
                </p>
                <p className="text-lg md:text-xl mb-1">{imageData.camera}</p>
                <p className="text-lg md:text-xl mb-1">{imageData.lens}</p>
                <p className="text-lg md:text-xl mb-4">
                  {imageData.focalLength} | f/{imageData.fNumber} |{" "}
                  {imageData.shutterSpeed}s | {imageData.iso}
                </p>

                <div className="flex mb-4">
                  {imageData.colorPalette.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      style={{ backgroundColor: color }}
                      className="flex-1 h-8"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumDetails;
