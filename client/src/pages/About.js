const About = () => {
  return (
    <div className="flex flex-col overflow-y-auto items-center justify-start min-h-screen px-16">
      <div className="about-section">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col w-full justify-center items-start">
            <h2 className="title-2 pb-8">Bio</h2>
            <div>
              <p className="text-lg mb-8">
                I am a fourth-year undergraduate at UC Berkeley majoring in
                Computer Science and Business Administration. I am interested in
                algorithm design, information theory, graph theory, and
                cybersecurity.
              </p>
              <p className="text-lg mb-8">
                More recently, I interned at SpecterOps, where I{" "}
                <a
                  href="https://github.com/SpecterOps/BloodHound/pulls?q=is%3Apr+assignee%3Aiustinum+is%3Aclosed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-black decoration-1 underline-offset-2 
               hover:bg-black hover:text-white transition-colors duration-300"
                >
                  debugged and prototyped a new data ingestion pipeline for the
                  Go backend of popular security tool Bloodhound Enterprise.
                </a>
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
                <p className="text-lg font-bold">
                  B.A. in Computer Science, B.S. in Business Administration
                </p>
                <p className="text-lg italic mb-8">
                  University of California, Berkeley,{" "}
                  <span className="not-italic">2021 - 2025</span>
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Classical Diploma</p>
                <p className="text-lg italic mb-8">
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
                <p className="text-lg font-bold">SpecterOps</p>
                <p className="text-lg mb-8">
                  Software Engineer Intern, 2024
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Intel</p>
                <p className="text-lg mb-8">
                  Software Engineer Intern, 2023
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Blum Center</p>
                <p className="text-lg mb-8">
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
                <p className="text-lg font-bold">Programming Languages</p>
                <p className="text-lg mb-8">
                  Python, JavaScript, Go, TypeScript, Go, Java, Rust, C, C++,
                  SQL, R
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Frameworks</p>
                <p className="text-lg mb-8">
                  React, Angular, Express, Node.js, .NET, Django, Flask
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Databases</p>
                <p className="text-lg mb-8">
                  MySQL, PostgreSQL, MongoDB, GraphQL, Neo4j
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Libraries</p>
                <p className="text-lg mb-8">
                  NumPy, PyTorch, Tensorflow, Scikit, Spark, Pandas, Matplotlib,
                  Seaborn
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Developer Tools</p>
                <p className="text-lg mb-8">
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
