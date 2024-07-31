import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = ({ currentPath }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="sidebar">
      <Link className="ml-[24px]" to="/">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 289.6 87.42"
          className="sidebar-logo"
        >
          <text
            className="fill-current font-['Arial-Black'] text-[100px] tracking-[-0.13em] translate-y-[85.98px] scale-x-[1.12] scale-y-[1]"
            transform="translate(-2.28 85.98) scale(1.12 1)"
          >
            <tspan x="0" y="0">
              JWU
            </tspan>
          </text>
        </svg>
      </Link>
      <nav className="flex mr-[24px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
          }
        >
          PROJECTS
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
          }
        >
          GALLERY
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
          }
        >
          BLOG
        </NavLink>
        <div className="flex dropdown cursor-pointer">
        <span
            className={`flex items-center sidebar-item ${isDropdownOpen ? 'font-["Sohne-Halbfett"]' : ''}`}
            onClick={toggleDropdown}
          >
            CONTACT
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className={`arrow w-6 h-6 ml-1 ${
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
