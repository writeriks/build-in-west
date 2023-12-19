import React, { useMemo } from "react";
import TableRow from "../table-row/table-row";
import { TableStockCells } from "../../../table-stock-cells/table-stock-cells";

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { type Stock } from "../../../../types/stock-types";

interface TableBodyProps {
  isSelectable?: boolean;
  isEdit: boolean;
  data: Stock[];
  setData: (value: React.SetStateAction<Stock[]>) => void;
  pageSize: number;
  searchLabel: string;
  pageNumber: number;
}

const TableBody: React.FC<TableBodyProps> = ({
  isSelectable,
  isEdit,
  pageSize,
  searchLabel,
  data,
  pageNumber,
  setData,
}) => {
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
    () => data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    [pageNumber, data, pageSize]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setData((tableData) => {
        const oldIndex = tableData.findIndex(
          (data) => data.symbol === active.id
        );
        const newIndex = tableData.findIndex((data) => data.symbol === over.id);
        return arrayMove(tableData, oldIndex, newIndex);
      });
    }
  };

  const draggableTableBody = () => {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={paginatedList}
          strategy={verticalListSortingStrategy}
        >
          {paginatedList.map((item, index) => (
            <TableRow
              isSelectable={isSelectable}
              key={index}
              isEdit={isEdit}
              cellStyles={TableStockCells(item)}
              item={item}
            />
          ))}
        </SortableContext>
      </DndContext>
    );
  };

  return (
    <tbody>
      {!!searchLabel
        ? filteredList
            .slice(0, pageSize)
            .map((item, index) => (
              <TableRow
                item={item}
                isSelectable={isSelectable}
                key={index}
                isEdit={isEdit}
                cellStyles={TableStockCells(item)}
              />
            ))
        : draggableTableBody()}
    </tbody>
  );
};

export default TableBody;
