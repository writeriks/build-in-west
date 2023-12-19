import React, { type CSSProperties } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { type Stock } from "../../../../types/stock-types";
import DragButton from "../table-buttons/drag-button";
import DeleteButton from "../table-buttons/delete-button";

interface TableRowProps {
  isSelectable?: boolean;
  isEdit?: boolean;
  cellStyles: React.ReactNode[];
  item: Stock;
}

const TableRow: React.FC<TableRowProps> = ({
  isSelectable,
  isEdit,
  cellStyles,
  item,
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
          '"transition-width duration-500" overflow-hidden opacity-100 transition-opacity duration-500'
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
