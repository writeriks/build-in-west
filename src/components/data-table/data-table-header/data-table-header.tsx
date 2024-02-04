import React from "react";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Table, flexRender } from "@tanstack/react-table";

interface DataTableHeaderProps {
  table: Table<any>;
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({ table }) => {
  return (
    <>
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
    </>
  );
};

export default DataTableHeader;
