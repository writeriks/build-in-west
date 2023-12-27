import React from "react";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { ChevronDown } from "lucide-react";
import { type Table } from "@tanstack/react-table";

interface GlobalSearchProps {
  deferredFilter: string;
  setGlobalFilter: (value: string) => void;
  table: Table<any>;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  deferredFilter,
  setGlobalFilter,
  table,
}) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search in Table..."
        value={deferredFilter}
        onChange={(event) => setGlobalFilter(event.currentTarget.value)}
        className="max-w-sm"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GlobalSearch;
