import React from "react";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { HandIcon, GrabIcon, FilterIcon } from "lucide-react";
import { type Table } from "@tanstack/react-table";
import { cn } from "../../../lib/utils";

interface GlobalSearchProps {
  deferredFilter: string;
  setGlobalFilter?: (value: string) => void;
  table: Table<any>;
  isSort?: boolean;
  handleSort?: (value: boolean) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  table,
  deferredFilter,
  setGlobalFilter,
  handleSort,
  isSort = false,
}) => (
  <div className="flex items-center py-4">
    {setGlobalFilter ? (
      <Input
        placeholder="Search in Table..."
        value={deferredFilter}
        onChange={(event) => setGlobalFilter(event.currentTarget.value)}
        className="w-38 md:w-64"
      />
    ) : null}

    {handleSort ? (
      <Button
        onClick={() => handleSort && handleSort(isSort)}
        variant="outline"
        className={cn(
          "ml-auto ",
          isSort ? "bg-gray-300 hover:bg-gray-300" : ""
        )}
      >
        {isSort ? (
          <GrabIcon className="h-4 w-4" />
        ) : (
          <HandIcon className="h-4 w-4" />
        )}
      </Button>
    ) : null}

    {setGlobalFilter ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(handleSort ? "ml-2" : "ml-auto")}
          >
            <FilterIcon className="h-4 w-4" />
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
    ) : null}
  </div>
);

export default GlobalSearch;
