import React, { type CSSProperties } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { type Stock } from "../../../../types/stock-types";
import DragButton from "../table-buttons/drag-button";
import DeleteButton from "../table-buttons/delete-button";

interface TableRowProps {
  isSelectable?: boolean;
  isEdit?: boolean;
  isFavorite?: boolean;
  cellStyles: React.ReactNode[];
  item: Stock;
  onFavoriteChange?: (item: Stock) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  isSelectable,
  isEdit,
  cellStyles,
  item,
  isFavorite,
  onFavoriteChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.symbol,
      disabled: !isEdit,
      transition: null,
    });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
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

      {cellStyles.map((cell) => cell)}

      <td
        className={
          "transition-width flex justify-center overflow-hidden opacity-100 transition-opacity duration-500"
        }
      >
        <div className="flex flex-row justify-end px-1 py-1 md:py-3">
          <button
            type="button"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-transparent hover:bg-yellow-100 focus:outline-none"
            title="Add to Favorites"
            onClick={() => onFavoriteChange && onFavoriteChange(item)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-yellow-500"
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        </div>
      </td>
      <td
        className={
          "transition-width overflow-hidden opacity-100 transition-opacity duration-500"
        }
      >
        {isEdit ? (
          <div className="flex flex-row justify-end px-1 py-1 md:py-3">
            <DragButton />

            {/* Spacer */}
            <div className="w-2" />

            <DeleteButton />
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default TableRow;
