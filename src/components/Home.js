import { Link } from "react-router-dom";
import photo from "../assets/images/homepage-image.jpg";
import { motion as m } from "framer-motion";

const Home = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="home-content"
    >
      <div className="home-content-container">
        <div className="home-content-text-area">
          <h1 className="title">
            Hi, <br />
            I am Justin, <br />I code.
          </h1>
          <h2 className="title-3">Computer Science + Business at UC Berkeley.</h2>
          <Link to="/projects" className="link">
            PROJECTS
          </Link>
        </div>
        <img
          class="home-content-image sm:ml-8"
          src={photo}
          alt="handsome dude"
        />
      </div>
    </m.div>
  );
};

export default Home;
