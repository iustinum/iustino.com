import { Link } from "react-router-dom";
import Image from './Image';
import './index.scss';
import {motion as m} from "framer-motion";

const Home = () => {
    return (
        <m.div initial={{opacity:0}} animate={{opacity: 1}} transition={{duration: 1}} className="container home-page">
            <div className="text-zone">
                <h1>Hi, <br /> I'm Justin, <br /> I code. </h1>

                <h2>Computer Science + Business at UC Berkeley.</h2>
                <Link to="/projects" className='flat-button'> PROJECTS </Link>
            </div>
            <Image/>
        </m.div>

    );
}

export default Home