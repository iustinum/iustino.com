import { Link } from "react-router-dom";
import photo from "../assets/images/home-image.jpg";
import { motion as m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Home = () => {
  const [index, setIndex] = useState(0);
  const words = ["code", "design", "create", "innovate"];

  // Handle text cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 4000); // change word every 4 seconds
    return () => clearInterval(interval);
  }, [words.length]);


  return (
      <div className="home-content">
        <div className="home-content-container">
          <div className="home-content-text-area">
            <h1 className="title">
              Hi, <br />
              I am Justin, <br />I{" "}
              <AnimatePresence mode="wait">
                <m.span
                  key={words[index]}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  {words[index]}
                </m.span>
              </AnimatePresence>
              .
            </h1>
            <h2 className="title-3">
              Computer Science + Business at UC Berkeley.
            </h2>
            <Link
              to="/blog"
              className="home-button"
            >
              BLOG
            </Link>
          </div>
          <img
            className="home-content-image sm:ml-8"
            src={photo}
            alt="handsome dude"
          />
        </div>
      </div>
  );
};

export default Home;
