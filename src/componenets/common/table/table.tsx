import React, { useDeferredValue, useMemo, useState } from "react";
import SearchBar from "../search-bar/search-bar";
import Pagination from "../pagination/pagination";
import { type Stock } from "../../../types/stock-types";
import TableRow from "./table-row";

interface TableProps {
  isSelectable?: boolean;
  headers: string[];
  data: Stock[];
  onSortFinished?: () => Promise<void>;
}

const PAGE_SIZE = 10;
const Table: React.FC<TableProps> = ({
  isSelectable,
  headers,
  onSortFinished,
  data,
}) => {
  const [isSort, setIsSort] = useState(false);
  const [searchLabel, setSearchLabel] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const deferredSearchLabel = useDeferredValue(searchLabel);

  const pageCount = useMemo(() => Math.ceil(data.length / PAGE_SIZE), [data]);
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
    () =>
      filteredList.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE),
    [pageNumber, filteredList]
  );

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

            {headers.map((header, index) => (
              <th scope="col" key={index} className="px-3 py-1 md:px-6 md:py-3">
                {header}
              </th>
            ))}

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
          {!!searchLabel
            ? filteredList
                .slice(0, PAGE_SIZE)
                .map((item, index) => <TableRow key={index} item={item} />)
            : paginatedList.map((item, index) => (
                <TableRow key={index} item={item} />
              ))}
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
