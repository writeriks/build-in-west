import React from "react";

const DragButton = () => {
  return (
    <button type="button" title="drag" className="cursor-move">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-4 w-4 text-gray-800 dark:text-white md:h-6 md:w-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};

export default DragButton;
