import './index.scss'
import { Link, NavLink } from 'react-router-dom'
import LogoJ from '../../assets/images/jwu-logo-colored.svg'
import { useState, useEffect } from 'react';

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    // click anywhere to hide dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest('.dropdown')) {
            setIsDropdownOpen(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    return (
        
        <div className='nav-bar'>

            <Link className='logo' to='/'> 
                <img src={LogoJ} alt="logo" /> 
            </Link>

            <nav>
                <NavLink exact="true" activeclassname='active' to="/">Home</NavLink>
                <NavLink exact="true" activeclassname='active' className='about-link' to="/about">About </NavLink>
                <NavLink exact="true" activeclassname='active' className='projects-link' to="/projects">Projects </NavLink>
                {/* contact dropdown */}
                <div className='dropdown'>
                    <span className='dropdown-toggle' onClick={toggleDropdown}>
                        Contact
                        <svg
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        className={`arrow ${isDropdownOpen ? 'up' : 'down'}`}
                        >
                        <polygon fill="currentColor" points="8 10.98 3.51 6.49 4.49 5.51 8 9.02 11.51 5.51 12.49 6.49 8 10.98" />
                        </svg>
                    </span>
                    {isDropdownOpen && (
                        <div className='dropdown-menu'>
                            <a target="_blank" rel='noreferrer' href='https://www.linkedin.com/in/juwu/'>LinkedIn</a>
                            <a target="_blank" rel='noreferrer' href='https://github.com/iustinum'>GitHub</a>
                            <a target="_blank" rel='noreferrer' href='https://twitter.com/_justinwu'>Twitter</a>
                            <a target="_blank" rel='noreferrer' href='https://news.ycombinator.com/user?id=wuj'>HN</a>
                        </div>
                        )}
                </div>
            </nav>
        </div>
    );
}; 

export default Sidebar