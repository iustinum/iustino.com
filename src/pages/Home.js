import { Link } from "react-router-dom";
import photo from "../assets/images/home-image.jpg";

const Home = () => {
  return (
    <div className="home-content">
      <div className="home-content-container">
        <div className="home-content-text-area">
          <div className="text-container">
            <h1 className="title">
              Hi, <br />
              I am Justin. <br />
            </h1>
            <h2 className="title-3">Life is random, so is the code</h2>
            <Link to="/about" className="home-button">
              ABOUT ME
            </Link>
          </div>
        </div>
        <img className="home-content-image" src={photo} alt="handsome dude" />
      </div>
    </div>
  );
};

export default Home;
