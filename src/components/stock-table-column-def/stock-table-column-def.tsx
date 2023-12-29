import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal, RotateCwIcon } from "lucide-react";

import { type Stock } from "../../types/stock-types";
import useSession from "../../hooks/useSession";
import { api } from "../../utils/api";
import { useState } from "react";
import { cn } from "../../lib/utils";

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
      cell: ({ row }) => {
        return (
          <>
            <ToggleFavorite stock={row.original} />
          </>
        );
      },
    },
  ];
};

interface ToggleFavoriteProps {
  stock: Stock;
}
const ToggleFavorite: React.FC<ToggleFavoriteProps> = ({ stock }) => {
  const session = useSession();

  const { refetch } = api.stocks.getStocks.useQuery({
    userId: session ? session?.id : "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const addStocksToWatchlistMutation =
    api.stocks.addUserStocksToWatchList.useMutation();
  const removeStocksToWatchlistMutation =
    api.stocks.removeUserStocksToWatchList.useMutation();

  const { isFavorite, id } = stock;

  const toggleFavorite = async (stock: Stock) => {
    try {
      setIsLoading(true);
      if (!stock.isFavorite) {
        await addStocksToWatchlistMutation.mutateAsync({
          userId: session ? session?.id : "",
          buyPrice: parseFloat(stock.lastPrice.replace(",", ".")),
          stockSymbol: stock.symbol,
          quantitiy: 1,
          stockName: stock.name,
        });
      } else if (stock.isFavorite) {
        await removeStocksToWatchlistMutation.mutateAsync({
          userId: session ? session?.id : "",
          symbol: stock.symbol,
        });
      }
      await refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <RotateCwIcon className="h-[15px] w-[px] animate-spin" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => toggleFavorite(stock)}>
              {isFavorite ? "Remove Favorite" : "Add To Favorite"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Copy Stock Symbol
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
