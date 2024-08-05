const About = () => {
  return (
    <div className="about-content">
      <div className="about-section">
        <div className="about-section-container">
          <div className="about-section-text-area border-t border-black pt-8">
            <h2 className="title-2 pb-8">Bio</h2>
            <div>
              <p className="text-[18px] mb-8">
                Hi. I'm Justin, a CS and Business major at UC Berkeley. My
                interests range from software development to financial
                engineering. I also have a strong fascination with data science
                and its application across various fields, particularly within
                cybersecurity.
              </p>
              <p className="text-[18px] mb-8">
                I used to swim competitively and have entertained with the idea
                of becoming a professional swimmer. Currently, I run and swim to
                stay fit. I also like to try out new tech frameworks and work on
                my own projects. My most recent projects use Go and TypeScript.
                I'm also experimenting with Rust. Besides tech, I enjoy
                photography and experimenting with sound designs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-section-container">
          <div className="about-section-text-area border-t border-black pt-8">
            <h2 className="title-2 pb-8">Education</h2>
            <div>
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

      <div className="about-section">
        <div className="about-section-container">
          <div className="about-section-text-area border-t border-black pt-8">
            <h2 className="title-2 pb-8">Work Experience</h2>
            <div>
              <div>
                <p className="text-[18px] font-bold">SpecterOps</p>
                <p className="text-[18px] mb-8">
                  Software Engineer Intern, 2024
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Intel</p>
                <p className="text-[18px] mb-8">
                  Software Engineer Intern, 2023
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Blum Center</p>
                <p className="text-[18px] mb-8">
                  Full-Stack Web Developer, 2022
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section mb-[90px]">
        <div className="about-section-container">
          <div className="about-section-text-area border-t border-black pt-8">
            <h2 className="title-2 pb-8">Technical Skills</h2>
            <div>
              <div>
                <p className="text-[18px] font-bold">Programming Languages</p>
                <p className="text-[18px] mb-8">
                  Python, JavaScript, Go, TypeScript, Go, Java, Rust, C, C++,
                  SQL, R
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Frameworks</p>
                <p className="text-[18px] mb-8">
                  React, Angular, Express, Node.js, .NET, Django, Flask
                </p>
              </div>
              <div>
                <p className="text-[18px] font-bold">Databases</p>
                <p className="text-[18px] mb-8">
                  MySQL, PostgreSQL, MongoDB, GraphQL, Neo4j
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
    </div>
  );
};

export default About;
