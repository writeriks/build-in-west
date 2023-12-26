import React from "react";

interface SideBarMenuProps {
  isHamburgerMenuOpen: boolean;
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ isHamburgerMenuOpen }) => (
  <div
    className={`fixed right-0 top-0 z-40 h-screen w-64 transform bg-red-800 transition-transform ease-in-out ${
      isHamburgerMenuOpen ? "translate-x-0" : "translate-x-64"
    }`}
  >
    <ul className="flex h-full flex-col items-center justify-center space-y-4">
      <li>
        <a href="/my-portfolio" className="text-white">
          My Portfolio
        </a>
      </li>
      <li>
        <a href="/my-expenses" className="text-white">
          My Expenses
        </a>
      </li>
      <li>
        <a href="/api/auth/logout" className="text-white">
          Log out
        </a>
      </li>
    </ul>
  </div>
);

export default SideBarMenu;
