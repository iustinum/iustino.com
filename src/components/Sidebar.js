import { Link, NavLink, useLocation } from "react-router-dom";
import LogoJ from "../assets/images/jwu-logo-colored.svg";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <div className="flex justify-between items-center w-full h-auto fixed top-0 bg-themeBackground text-themeText">
      <Link className="ml-[24px]" to="/">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 289.6 87.42"
          className="block mx-auto w-40 h-12 my-2 text-themeText"
        >
          <text
            className="fill-current font-['Arial-Black'] text-[100px] tracking-[-0.13em] transform translate-y-[85.98px] scale-x-[1.12] scale-y-[1]"
            transform="translate(-2.28 85.98) scale(1.12 1)"
          >
            <tspan x="0" y="0">
              JWU
            </tspan>
          </text>
        </svg>
      </Link>
      <nav className="flex mr-[24px]">
        <NavLink to="/" className="sidebar-item">
          Home
        </NavLink>
        <NavLink to="/about" className="sidebar-item">
          About
        </NavLink>
        <NavLink to="/projects" className="sidebar-item">
          Projects
        </NavLink>
        <NavLink className="sidebar-item" to="/blog">
          Blog
        </NavLink>
        <div className="flex dropdown cursor-pointer">
          <span
            className="flex items-center sidebar-item"
            onClick={toggleDropdown}
          >
            Contact
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className={`arrow w-6 h-6 ml-1 transition-transform duration-300 ease-in-out transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <polygon
                fill="currentColor"
                points="8 10.98 3.51 6.49 4.49 5.51 8 9.02 11.51 5.51 12.49 6.49 8 10.98"
              />
            </svg>
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                className={`dropdown-item`}
                to="https://www.linkedin.com/in/juwu/"
                target="_blank"
              >
                LinkedIn
              </Link>
              <Link
                className="dropdown-item"
                to="https://github.com/iustinum"
                target="_blank"
              >
                GitHub
              </Link>
              <Link
                className="dropdown-item"
                to="https://twitter.com/_justinwu"
                target="_blank"
              >
                Twitter
              </Link>
              <Link
                className="dropdown-item"
                to="https://news.ycombinator.com/user?id=wuj"
                target="_blank"
              >
                HN
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
