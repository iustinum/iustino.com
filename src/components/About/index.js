import './index.scss'
import {motion as m} from "framer-motion";

const About = () => {
    
    return (
        <m.div initial={{opacity:0}} animate={{opacity: 1}} transition={{duration: 1}} div className='container about-page'>
            <div className='text-zone'>
                <h1>About Me</h1>
                <p>
                    Hi! I'm Justin, a CS and Business major at UC Berkeley. My interests range from full-stack development to trading. I also have a strong fascination withdata science and its application across various fields, paricularly within the healthcare industry.
                </p>
                <p>
                    My goal is to use my engineering skills for starting my own business. I want to solve problems in developing countries and help them use AI more, both in personal and business settings.
                </p>
                <p>
                In my free time, I run and swim to stay fit. I also like to try out new tech, learn about new tech frameworks, and work on my own projects. Besides tech, I enjoy making music and experimenting with sound designs.
                </p>
            </div>
        </m.div>
    )
}

export default About