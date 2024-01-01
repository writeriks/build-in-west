import React, { useState } from "react";
import useSession from "../../hooks/useSession";
import { useDispatch } from "react-redux";

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
import { setShouldRefetchUserStocks } from "../../store/reducers/ui-reducer/ui-slice";

import { type Stock } from "../../types/stock-types";

interface CellActionMenuProps {
  stock: Stock;
}
const CellActionMenu: React.FC<CellActionMenuProps> = ({ stock }) => {
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const removeStocksToWatchlistMutation =
    api.stocks.removeUserStocksToWatchList.useMutation();

  const { id } = stock;

  const removeFavorite = async (stock: Stock) => {
    try {
      setIsLoading(true);
      await removeStocksToWatchlistMutation.mutateAsync({
        userId: session ? session?.id : "",
        symbol: stock.symbol,
      });
      dispatch(setShouldRefetchUserStocks(true));
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
            <DropdownMenuItem onClick={() => removeFavorite(stock)}>
              Remove Favorite
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
