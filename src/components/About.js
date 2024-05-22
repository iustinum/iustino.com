import { motion as m } from "framer-motion";
import photo from "../assets/images/about-image.jpg";

const About = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="about-content"
    >
      <div className="about-section pt-[160px]">
        <div className="about-section-container">
          <div className="about-section-text-area">
            <h1 className="title">About</h1>
          </div>
          <img class="about-section-image" src={photo} alt="About" />
        </div>
      </div>

      <div className="about-section pt-[90px] bg-white">
        <div className="about-section-container w-full">
          <div className="about-section-text-area border-t border-black pt-8">
            <h2 className="title-2 pb-8">Bio</h2>
            <div className="w-1/2 ml-2">
              <p className="text-[18px] mb-8">
                Hi. I'm Justin, a CS and Business major at UC Berkeley. My
                interests range from full-stack development to trading. I also
                have a strong fascination with data science and its application
                across various fields, particularly within the healthcare
                industry.
              </p>

              <p className="text-[18px] mb-8">
                My goal is to use my engineering skills to start my own
                business. I want to develop tools to democratize AI adoption in
                developing countries.
              </p>

              <p className="text-[18px] mb-8">
                I used to swim competitively and have entertained with the idea
                of becoming a professional swimmer. Currently, I run and swim to
                stay fit. I also like to try out new tech, learn about new tech
                frameworks, and work on my own projects. My most recent projects
                use Go and TypeScript. I'm also experimenting with Rust. Besides
                tech, I enjoy making music and experimenting with sound designs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section pt-[90px] bg-white">
        <div className="about-section-container w-full">
          <div className="about-section-text-area border-t border-black pt-8">
            <h2 className="title-2 pb-8">Education</h2>
            <div className="w-1/2 ml-2">
              <div>
                <p className="text-[18px] font-bold">
                  B.A. in Computer Science, B.S. in Business Administration
                </p>
                <p className="text-[18px] italic mb-8">
                  University of California, Berkeley,{" "}
                  <span className="not-italic">2021 - 2025</span>
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Classical Diploma</p>
                <p className="text-[18px] italic mb-8">
                  The Loomis Chaffee School,{" "}
                  <span className="not-italic">2017 - 2021</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section pt-[90px] bg-white">
        <div className="about-section-container w-full">
          <div className="about-section-text-area border-t border-black pt-8">
            <h2 className="title-2 pb-8">Work Experience</h2>
            <div className="w-1/2 ml-2">
              <div className="">
                <p className="text-[18px] font-bold">Intel</p>
                <p className="text-[18px] mb-8">
                  Software Engineer Intern
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Blum Center</p>
                <p className="text-[18px] mb-8">
                  Full-Stack Web Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section py-[90px] bg-white">
        <div className="about-section-container w-full">
          <div className="about-section-text-area border-t border-black pt-8">
            <h2 className="title-2 pb-8">Technical Skills</h2>
            <div className="w-1/2 ml-2">
              <div>
                <p className="text-[18px] font-bold">Programming Languages</p>
                <p className="text-[18px] mb-8">
                  Java, Python, C, SQL, R, JavaScript, TypeScript, Scala, Go,
                  Rust, C++, C#
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Frameworks</p>
                <p className="text-[18px] mb-8">
                  React, Angular, Node.js, MongoDB, .NET, Django, Flask
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Databases</p>
                <p className="text-[18px] mb-8">
                  MySQL, PostgreSQL, MongoDB, Neo4j
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Libraries</p>
                <p className="text-[18px] mb-8">
                  NumPy, PyTorch, Tensorflow, Scikit, Spark, Pandas, Matplotlib,
                  Seaborn
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Developer Tools</p>
                <p className="text-[18px] mb-8">
                  Git, Docker, Kubernetes, Kafka, Jenkins, Grafana, PowerBI,
                  Google Cloud Platform, AWS, Jira
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default About;
