import React, { useDeferredValue, useEffect, useState } from "react";

import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Table as DataTable,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import GlobalSearch from "./global-search/global-search";
import Pagination from "./pagination/pagination";

import DataTableBody from "./data-table-body/data-table-body";
import DataTableHeader from "./data-table-header/data-table-header";

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
  isLoading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  setDataOnDragEnd,
  handleSortingOver,
  columnDef,
  filtersEnabled = false,
  selectingEnabled = false,
  pageSize = 10,
  isLoading,
}) => {
  const [tableData, setTableData] = useState<any[]>([]);

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
          <DataTableHeader table={table} />

          <DataTableBody
            columnDef={columnDef}
            isLoading={isLoading}
            isSort={isSort}
            setDataOnDragEnd={setDataOnDragEnd}
            setTableData={setTableData}
            table={table}
            tableData={tableData}
          />
        </Table>
      </div>
      <Pagination table={table} selectingEnabled={selectingEnabled} />
    </div>
  );
};

export default DataTable;
