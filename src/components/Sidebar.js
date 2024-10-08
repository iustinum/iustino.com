import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => {
      const newState = !prevState;
      if (newState) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
        setIsDropdownOpen(false); // Close dropdown when closing mobile menu
      }
      return newState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown") &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".hamburger-icon")
      ) {
        setIsDropdownOpen(false);
        if (isMobileMenuOpen) {
          toggleMobileMenu();
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isMobileMenuOpen]);

  const NavItems = () => (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
        }
        onClick={() => setIsMobileMenuOpen(false)}
      >
        HOME
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
        }
        onClick={toggleMobileMenu}
      >
        ABOUT
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
        }
        onClick={toggleMobileMenu}
      >
        PROJECTS
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
        }
        onClick={toggleMobileMenu}
      >
        GALLERY
      </NavLink>
      <NavLink
        to="/blog"
        className={({ isActive }) =>
          isActive ? "sidebar-item font-['Sohne-Halbfett']" : "sidebar-item"
        }
        onClick={toggleMobileMenu}
      >
        BLOG
      </NavLink>
      <div className="dropdown cursor-pointer">
        <span
          className={`flex items-center sidebar-item ${
            isDropdownOpen ? 'font-["Sohne-Halbfett"]' : ""
          }`}
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
              className="dropdown-item"
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
    </>
  );

  return (
    <>
      <div className="sidebar">
        <Link to="/">
          <img
            src="/assets/images/logo2.png"
            alt="JWU"
            className="sidebar-logo"
          />
        </Link>
        <nav className="hidden md:flex mr-[16px]">
          <NavItems />
        </nav>
        <div className="hamburger-container md:hidden">
          <button
            className={`hamburger-icon ${isMobileMenuOpen ? "open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <NavItems />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
