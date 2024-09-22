import { Link } from "react-router-dom";
import photo from "../assets/images/home-image.jpg";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen md:px-16">
      <div className="flex flex-col items-start gap-8">
        <div>
          <h1 className="text-5xl font-['Sohne-Halbfett'] leading-none my-8">
            Hi, <br />
            I am Justin. <br />
          </h1>
          <Link
            to="/about"
            className="link border-black hover:bg-black hover:text-white"
          >
            ABOUT ME
          </Link>
        </div>
        <div>
          <img
            className="object-contain max-h-[30vh]"
            src={photo}
            alt="handsome dude"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
