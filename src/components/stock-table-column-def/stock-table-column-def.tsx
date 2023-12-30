import CellActionMenu from "./cell-action-menu";

import { cn } from "../../lib/utils";

import { type ColumnDef } from "@tanstack/react-table";
import { type Stock } from "../../types/stock-types";

export const stockTableColumnDef = (isMobile: boolean): ColumnDef<Stock>[] => {
  return [
    {
      accessorKey: "symbol",
      header: "Symbol",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("symbol")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div
          className={cn(
            isMobile
              ? "max-w-[100px] overflow-hidden	text-ellipsis whitespace-nowrap"
              : ""
          )}
        >
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "lastPrice",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("lastPrice"));

        // Format the amount as a try amount
        const formatted = new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "change",
      header: () => (
        <div className={"max-w-[70px] overflow-hidden whitespace-nowrap"}>
          Change %
        </div>
      ),
      cell: ({ row }) => <div>{row.getValue("change")}</div>,
    },
    {
      accessorKey: "volume",
      header: "Volume",
      cell: ({ row }) => <div>{row.getValue("volume")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <CellActionMenu stock={row.original} />,
    },
  ];
};
