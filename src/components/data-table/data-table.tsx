import React, { useDeferredValue, useEffect, useState } from "react";

import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Table as DataTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GlobalSearch from "./global-search/global-search";
import Pagination from "./pagination/pagination";

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { type Stock } from "../../types/stock-types";
import DataTableRow from "./data-table-row/data-table-row";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

interface DataTableProps {
  data: any[];
  setDataOnDragEnd: (data: any[]) => void;
  handleSortingOver: (data: any[]) => Promise<void>;
  columnDef: ColumnDef<any>[];
  pageSize?: number;
  sortingEnabled?: boolean;
  filtersEnabled?: boolean;
  selectingEnabled?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  setDataOnDragEnd,
  handleSortingOver,
  columnDef,
  filtersEnabled = false,
  selectingEnabled = false,
  pageSize = 10,
}) => {
  const [tableData, setTableData] = useState<Stock[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [isSort, setIsSort] = useState<boolean>(false);

  const [globalFilter, setGlobalFilter] = useState<string>();
  const deferredFilter = useDeferredValue(globalFilter);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (
      JSON.stringify(Object.values(tableData)) !==
        JSON.stringify(Object.values(data)) &&
      !isSort
    ) {
      setTableData(data);
    }
  }, [data, tableData, isSort]);

  const table = useReactTable({
    data: tableData,
    columns: columnDef,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter: deferredFilter,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [table, pageSize]);

  const handleSort = async (isSort: boolean) => {
    if (isSort) {
      await handleSortingOver(tableData);
    }
    setIsSort(!isSort);
  };

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
      const oldIndex = tableData.findIndex((data) => data.symbol === active.id);
      const newIndex = tableData.findIndex((data) => data.symbol === over.id);
      sortedArray = arrayMove(tableData, oldIndex, newIndex);

      setTableData(sortedArray);
    }

    setDataOnDragEnd(sortedArray);
  };

  return (
    <div className="w-full">
      <GlobalSearch
        table={table}
        deferredFilter={deferredFilter ? deferredFilter : ""}
        setGlobalFilter={filtersEnabled ? setGlobalFilter : undefined}
        isSort={isSort}
        handleSort={(isSort) => handleSort(isSort)}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

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
                        tableData.find(
                          (item) =>
                            item.symbol === (row.original as Stock).symbol
                        )!
                      }
                      isSort={isSort}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnDef.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} selectingEnabled={selectingEnabled} />
    </div>
  );
};

export default DataTable;
