import React from "react";

import { type ColumnDef, type Table } from "@tanstack/react-table";
import {
  DndContext,
  type DragEndEvent,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DataTableRow from "../data-table-row/data-table-row";
import { TableBody } from "../../ui/table";
import TableEmptyRow from "../table-empty-row/table-empty-row";

interface DataTableBodyProps {
  table: Table<any>;
  tableData: { id: string }[];
  columnDef: ColumnDef<any>[];
  isSort: boolean;
  setTableData: (data: any[]) => void;
  setDataOnDragEnd: (data: any[]) => void;
  isLoading: boolean;
}

const DataTableBody: React.FC<DataTableBodyProps> = ({
  table,
  tableData,
  isSort,
  setTableData,
  setDataOnDragEnd,
}) => {
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    let sortedArray: any[] = [];
    if (active.id !== over.id) {
      const oldIndex = tableData.findIndex((data) => data.id === active.id);
      const newIndex = tableData.findIndex((data) => data.id === over.id);

      sortedArray = arrayMove(tableData, oldIndex, newIndex);

      setTableData(sortedArray);
    }

    setDataOnDragEnd(sortedArray);
  };

  return (
    <>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tableData}
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows.map((row) => (
                <DataTableRow
                  key={row.id}
                  row={row}
                  item={
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    tableData.find((item) => item.id === row.original.id)!
                  }
                  isSort={isSort}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <TableEmptyRow />
        )}
      </TableBody>
    </>
  );
};

export default DataTableBody;
