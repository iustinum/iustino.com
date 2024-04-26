import { motion as m } from "framer-motion";

const About = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container"
    >
      <div className="absolute left-[15%] top-1/2 transform -translate-y-1/2 w-2/5 max-h-[90%]">
        <h1 className="text-[#F7CC90] text-[53px] m-0 leading-none font-normal">
          About Me
        </h1>
        <p className="text-[#F7CC90] mt-5 font-normal text-[20px] font-['Sohne-Buch'] tracking-[0px]">
          Hi! I'm Justin, a CS and Business major at UC Berkeley. My interests range from full-stack development to trading. I also have a strong fascination with data science and its application across various fields, particularly within the healthcare industry.
        </p>
        <p className="text-[#F7CC90] mt-5 font-normal text-[20px] font-['Sohne-Buch'] tracking-[0px]">
          My goal is to use my engineering skills for starting my own business. I want to solve problems in developing countries and help them use AI more, both in personal and business settings.
        </p>
        <p className="text-[#F7CC90] mt-5 font-normal text-[20px] font-['Sohne-Buch'] tracking-[0px]">
          In my free time, I run and swim to stay fit. I also like to try out new tech, learn about new tech frameworks, and work on my own projects. Besides tech, I enjoy making music and experimenting with sound designs.
        </p>
      </div>
    </m.div>
  );
};

export default About;