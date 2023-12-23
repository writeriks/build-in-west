import React from "react";

interface TableHeaderProps {
  isSelectable?: boolean;
  isEdit?: boolean;
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({
  isSelectable,
  isEdit,
  headers,
}) => {
  return (
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
          className="transition-width w-0 overflow-hidden p-0 px-3 py-1 opacity-100 transition-opacity duration-500 duration-500 md:px-6 md:py-3"
        >
          Favorite
        </th>
        <th
          scope="col"
          className={`${
            isEdit
              ? "transition-width w-0 overflow-hidden p-0 px-3 py-1 opacity-100 transition-opacity duration-500 duration-500 md:px-6 md:py-3"
              : "w-0 opacity-0"
          }`}
        >
          {isEdit ? "Action" : ""}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
