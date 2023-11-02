import React from "react";
import { type Stock } from "../../../types/stock-types";

interface TableRowProps {
  isSelectable?: boolean;
  isEdit?: boolean;
  item: Stock;
}

const TableRow: React.FC<TableRowProps> = ({ isSelectable, item, isEdit }) => {
  return (
    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
      {isSelectable ? (
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
            />
            <label htmlFor="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
      ) : null}

      <th
        scope="row"
        className="whitespace-nowrap px-3 py-1 font-medium text-gray-900 dark:text-white md:px-6 md:py-4"
      >
        {item.name}
      </th>
      <td className="px-3 py-1 md:px-6 md:py-4">{item.lastPrice}</td>
      <td className="px-3 py-1 md:px-6 md:py-4">{item.change}</td>
      <td
        className={`${
          isEdit
            ? "transition-width overflow-hidden opacity-100 transition-opacity duration-500 duration-500"
            : "w-0 opacity-0"
        } `}
      >
        {isEdit ? (
          <div className="flex flex-row justify-end px-1 py-1 md:py-3">
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

            {/* Spacer */}
            <div className="w-2" />

            <button type="button" title="delete">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default TableRow;
