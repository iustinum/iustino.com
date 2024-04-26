import { Link, NavLink } from 'react-router-dom';
import LogoJ from '/Users/justinwu/iustino.com/src/assets/images/jwu-logo-colored.svg';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
    <div className="flex justify-between items-center w-full h-auto absolute top-0 z-10">
      <Link className="ml-5" to="/">
        <img src={LogoJ} alt="logo" className="block mx-auto w-20 my-2" />
      </Link>
      <nav className="flex justify-end items-center h-auto mr-7">
        <NavLink
          to="/"
          className="ml-5 text-2xl text-[#F7CC90] block leading-[51px] h-[51px] relative no-underline hover:underline"
        >
          Home
        </NavLink>
        <NavLink
          className="about-link ml-5 text-2xl text-[#F7CC90] block leading-[51px] h-[51px] relative no-underline hover:underline"
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className="projects-link ml-5 text-2xl text-[#F7CC90] block leading-[51px] h-[51px] relative no-underline hover:underline"
          to="/projects"
        >
          Projects
        </NavLink>
        <NavLink
          className="projects-link ml-5 text-2xl text-[#F7CC90] block leading-[51px] h-[51px] relative no-underline hover:underline"
          to="/blog"
        >
          Blog
        </NavLink>
        <div className="dropdown relative cursor-pointer flex items-center">
          <span
            className="dropdown-toggle text-2xl text-[#F7CC90] no-underline ml-5 hover:underline flex items-center"
            onClick={toggleDropdown}
          >
            Contact
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className={`arrow w-4 h-4 ml-1 transition-transform duration-300 ease-in-out transform translate-y-1 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            >
              <polygon
                fill="currentColor"
                points="8 10.98 3.51 6.49 4.49 5.51 8 9.02 11.51 5.51 12.49 6.49 8 10.98"
              />
            </svg>
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu absolute top-full mt-2">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/juwu/"
                className="block text-2xl text-[#F7CC90] no-underline py-1 hover:underline"
              >
                LinkedIn
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/iustinum"
                className="block text-2xl text-[#F7CC90] no-underline py-1 hover:underline"
              >
                GitHub
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/_justinwu"
                className="block text-2xl text-[#F7CC90] no-underline py-1 hover:underline"
              >
                Twitter
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://news.ycombinator.com/user?id=wuj"
                className="block text-2xl text-[#F7CC90] no-underline py-1 hover:underline"
              >
                HN
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;