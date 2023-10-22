import React, { useState } from "react";
import { useSelector } from "react-redux";
import uiReducerSelector from "../../store/reducers/ui-reducer/ui-reducer-selector";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHamburgerMenuOpen = useSelector(
    uiReducerSelector.getIsHamburgerMenuOpen
  );
  console.log(
    "🚀 ~ file: navigation-bar.tsx:10 ~ NavigationBar ~ isHamburgerMenuOpen:",
    isHamburgerMenuOpen
  );

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/my-portfolio" className="text-white">
          Your Logo
        </a>

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
          <a href="/my-portfolio" className="text-white">
            My Portfolio
          </a>
          <a href="/my-expenses" className="text-white">
            My Expenses
          </a>
          <a href="/api/auth/logout" className="text-white">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
