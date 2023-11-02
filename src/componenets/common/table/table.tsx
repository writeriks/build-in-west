import React, { useDeferredValue, useMemo, useState } from "react";
import SearchBar from "../search-bar/search-bar";
import Pagination from "../pagination/pagination";
import { type Stock } from "../../../types/stock-types";

interface TableProps {
  isSelectable?: boolean;
  headers?: string[];
  data: Stock[];
  onSortFinished?: () => Promise<void>;
}

const Table: React.FC<TableProps> = ({
  isSelectable,
  onSortFinished,
  data,
}) => {
  const [isSort, setIsSort] = useState(false);
  const [searchLabel, setSearchLabel] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const deferredSearchLabel = useDeferredValue(searchLabel);

  const pageCount = useMemo(() => Math.ceil(data.length / 30), [data]);
  const filteredList = useMemo(
    () =>
      data.filter(
        (item) =>
          item.symbol.toUpperCase().includes(searchLabel.toUpperCase()) ||
          item.name.toUpperCase().includes(searchLabel.toUpperCase())
      ),
    [searchLabel, data]
  );

  const paginatedList = useMemo(
    () => filteredList.slice((pageNumber - 1) * 30, pageNumber * 30),
    [pageNumber, filteredList]
  );

  console.log("🚀 ~ file: table.tsx:31 ~ filteredList:", filteredList);
  console.log("🚀 ~ file: table.tsx:38 ~ paginatedList:", paginatedList);

  const handleSort = async (isSort: boolean) => {
    if (isSort && onSortFinished) {
      console.log("Save");
      await onSortFinished();
    }
    setIsSort(!isSort);
  };

  return (
    <div className="relative w-full overflow-x-auto p-2 shadow-md sm:rounded-lg">
      <div className="flex flex-row justify-between ">
        <SearchBar
          id="table-search"
          value={deferredSearchLabel}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setSearchLabel(target.value)
          }
        />
        <button
          onClick={async () => await handleSort(isSort)}
          type="button"
          className="mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          {isSort ? "Done" : "Sort"}
        </button>
      </div>
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {isSelectable ? (
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            ) : null}
            <th scope="col" className="px-3 py-1 md:px-6 md:py-3">
              Symbol
            </th>
            <th scope="col" className="px-3 py-1 md:px-6 md:py-3">
              Price
            </th>
            <th scope="col" className="px-3 py-1 md:px-6 md:py-3">
              Change %
            </th>
            <th
              scope="col"
              className={`${
                isSort
                  ? "transition-width w-0 overflow-hidden p-0 px-3 py-1 opacity-100 transition-opacity duration-500 duration-500 md:px-6 md:py-3"
                  : "w-0 opacity-0"
              }`}
            >
              {isSort ? "Action" : ""}
            </th>
          </tr>
        </thead>
        <tbody>
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
              Apple
            </th>
            <td className="px-3 py-1 md:px-6 md:py-4">Silver</td>
            <td className="px-3 py-1 md:px-6 md:py-4">Laptop</td>
            <td
              className={`${
                isSort
                  ? "transition-width overflow-hidden opacity-100 transition-opacity duration-500 duration-500"
                  : "w-0 opacity-0"
              } `}
            >
              {isSort ? (
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
        </tbody>
      </table>
      <div className="flex justify-center">
        <Pagination
          count={pageCount}
          pageNumber={pageNumber}
          onPageChange={(value: number) => setPageNumber(value)}
        />
      </div>
    </div>
  );
};

export default Table;
