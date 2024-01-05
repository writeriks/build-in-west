import CellActionMenu from "./cell-action-menu";

import { cn } from "../../lib/utils";

import { type ColumnDef } from "@tanstack/react-table";
import { type Stock } from "../../types/stock-types";

export const stockTableColumnDef = (isMobile: boolean): ColumnDef<Stock>[] => {
  return [
    {
      accessorKey: "symbol",
      header: () => <div className="text-center">Symbol</div>,
      cell: ({ row }) => (
        <div className="text-center capitalize">{row.getValue("symbol")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div className="text-center">Name</div>,
      cell: ({ row }) => (
        <div
          className={cn(
            "max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-center"
          )}
        >
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "cost",
      header: () => <div className="text-center">Cost</div>,
      cell: ({ row }) => {
        const amount = row.original.averageCost ?? 0; //parseFloat(row.getValue("lastPrice"));

        // Format the amount as a try amount
        const formatted = new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "lastPrice",
      header: () => <div className="text-center">Price</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("lastPrice"));

        // Format the amount as a try amount
        const formatted = new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-center">Quantity</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.original.quantity ?? 1}
          </div>
        );
      },
    },
    {
      accessorKey: "profit",
      header: () => <div className="text-center">Profit</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.original.profit ?? 1}
          </div>
        );
      },
    },
    {
      accessorKey: "profitPercentage",
      header: () => (
        <div className="max-w-[100px] overflow-hidden whitespace-nowrap text-center">
          Profit %
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.original.profitPercentage?.toFixed(2) + "%" ?? 1}
          </div>
        );
      },
    },
    {
      accessorKey: "change",
      header: () => (
        <div
          className={
            "max-w-[100px] overflow-hidden whitespace-nowrap text-center"
          }
        >
          D. Change %
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("change")}</div>
      ),
    },
    {
      accessorKey: "volume",
      header: () => (
        <div
          className={
            "max-w-[100px] overflow-hidden whitespace-nowrap text-center"
          }
        >
          Volume
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {parseFloat(row.original.volume)}m
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <CellActionMenu stock={row.original} />,
    },
  ];
};
