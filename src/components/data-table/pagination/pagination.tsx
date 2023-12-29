import { type Table } from "@tanstack/react-table";
import React from "react";
import { Button } from "../../ui/button";

interface PaginationProps {
  table: Table<any>;
  selectingEnabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ table, selectingEnabled }) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      {selectingEnabled ? (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      ) : null}
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
