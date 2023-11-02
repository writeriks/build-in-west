import React, { useMemo } from "react";

interface PaginationProps {
  count: number;
  onPageChange: (page: number) => void;
  pageNumber: number;
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  onPageChange,
  pageNumber,
}) => {
  const pageNumbers = useMemo(() => {
    if (count <= 5) {
      return Array.from({ length: count }, (_, index) => index + 1);
    } else {
      // Determine the number of clickable page numbers to display
      const maxDisplay = 5;
      const pages = [];

      // Always add the first page as clickable
      pages.push(1);

      if (pageNumber <= 3) {
        // If the current page is within the first three pages,
        // display 4 more pages.
        for (let i = 2; i <= maxDisplay - 1; i++) {
          pages.push(i);
        }
      } else if (pageNumber >= count - 2) {
        // If the current page is within the last three pages,
        // display three previous pages.
        for (let i = count - (maxDisplay - 2); i < count; i++) {
          pages.push(i);
        }
      } else {
        // Display the current page and two pages before and after it.
        for (let i = pageNumber - 1; i <= pageNumber + 1; i++) {
          pages.push(i);
        }
      }

      // Always add the last page
      pages.push(count);

      return pages;
    }
  }, [count, pageNumber]);

  return (
    <nav
      className="flex items-center justify-between pt-4"
      aria-label="Table navigation"
    >
      <ul className="inline-flex h-8 -space-x-px text-sm">
        <li>
          <button
            disabled={pageNumber === 1}
            onClick={() => onPageChange(pageNumber - 1)}
            className="hover-bg-gray-100 hover-text-gray-700 dark-border-gray-700 dark-bg-gray-800 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500"
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index}>
            <button
              onClick={() => onPageChange(number)}
              className={
                pageNumber === number
                  ? `hover-bg-blue-100 hover-text-blue-700 dark-border-gray-700 dark-bg-gray-700 dark-text-white flex h-8 w-[40px] items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600`
                  : `hover-bg-gray-100 hover-text-gray-700 dark-border-gray-700 dark-bg-gray-800 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white flex h-8 w-[40px] items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500`
              }
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={pageNumber === count}
            onClick={() => onPageChange(pageNumber + 1)}
            className="hover-bg-gray-100 hover-text-gray-700 dark-border-gray-700 dark-bg-gray-800 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
