import React, { useState } from "react";
import styles from "../../styles/my-portfolio.module.scss";

const MyPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white">Your Logo</div>

          {/* Hamburger menu for mobile */}
          <div className="md:hidden">
            <button
              title="hamburger menu"
              className="transform text-white transition duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              <svg
                className={`h-6 w-6 transform transition-transform ${
                  isMenuOpen ? "-rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className={`hidden space-x-4 md:flex`}>
            <a href="#" className="text-white">
              Home
            </a>
            <a href="#" className="text-white">
              About
            </a>
            <a href="#" className="text-white">
              Services
            </a>
            <a href="#" className="text-white">
              Contact
            </a>
          </div>
        </div>
      </nav>
      <div className="h-16 h-full w-full bg-yellow-500">Content</div>
    </div>
  );
};

export default MyPortfolio;
