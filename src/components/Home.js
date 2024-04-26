import { Link } from "react-router-dom";
import photo from '/Users/justinwu/iustino.com/src/assets/images/homepage-image.jpg';
import { motion as m } from "framer-motion";

const Home = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container"
    >
      <div className="absolute left-[15%] top-1/2 transform -translate-y-1/2 w-2/5 max-h-[90%]">
        <h1 className="text-[#F7CC90] text-[53px] leading-none">
          Hi, <br /> I'm Justin, <br /> I code.
        </h1>
        <h2 className="text-[#F7CC90] mt-5 font-normal text-[20px] tracking-[0px]">
          Computer Science + Business at UC Berkeley.
        </h2>
        <Link
          to="/projects"
          className="text-[#F7CC90] text-[13px] font-normal tracking-[0px] no-underline px-[18px] py-[5px] border border-[#F7CC90] mt-[25px] float-left whitespace-nowrap hover:bg-[#F7CC90] hover:text-[#215254]"
        >
          PROJECTS
        </Link>
      </div>
      <div className="absolute top-[50%] right-[10%] transform -translate-y-1/2 w-[30%] h-auto z-0">
        <img src={photo} alt="handsome dude" className="w-full h-full object-contain" />
      </div>
    </m.div>
  );
};

export default Home;