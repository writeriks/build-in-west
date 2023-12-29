import React from "react";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { PencilIcon, FilterIcon } from "lucide-react";
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
        className="w-38 md:w-64"
      />

      <Button variant="outline" className="ml-auto">
        <PencilIcon className="h-3 w-3" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-2">
            <FilterIcon className="h-3 w-3" />
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
