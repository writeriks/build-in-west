import React, { useState } from "react";
import useSession from "../../hooks/useSession";

import { MoreHorizontal, RotateCwIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { api } from "../../utils/api";

import { type Stock } from "../../types/stock-types";

interface CellActionMenuProps {
  stock: Stock;
}
const CellActionMenu: React.FC<CellActionMenuProps> = ({ stock }) => {
  const session = useSession();

  const { data, refetch } = api.stocks.getStocks.useQuery({
    userId: session ? session?.id : "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const addStocksToWatchlistMutation =
    api.stocks.addUserStocksToWatchList.useMutation();
  const removeStocksToWatchlistMutation =
    api.stocks.removeUserStocksToWatchList.useMutation();

  const { id } = stock;

  const updatedStock =
    data && Object.values(data).find((item) => item.symbol === stock.symbol);

  const toggleFavorite = async (stock: Stock) => {
    try {
      setIsLoading(true);
      if (updatedStock) {
        if (!updatedStock.isFavorite) {
          await addStocksToWatchlistMutation.mutateAsync({
            userId: session ? session?.id : "",
            buyPrice: stock.lastPrice,
            stockSymbol: stock.symbol,
            quantitiy: 1,
            stockName: stock.name,
          });
        } else if (updatedStock.isFavorite) {
          await removeStocksToWatchlistMutation.mutateAsync({
            userId: session ? session?.id : "",
            symbol: stock.symbol,
          });
        }
      }
      console.log("refetching");
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
              {updatedStock?.isFavorite ? "Remove Favorite" : "Add To Favorite"}
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

export default CellActionMenu;
