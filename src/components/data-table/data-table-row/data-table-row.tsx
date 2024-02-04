import React, { type CSSProperties } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { flexRender, type Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DataTableRowProps {
  row: Row<any>;
  isSort: boolean;
  item: { id: string };
}

const DataTableRow: React.FC<DataTableRowProps> = ({ row, isSort, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
      disabled: !isSort,
      transition: null,
    });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default DataTableRow;
