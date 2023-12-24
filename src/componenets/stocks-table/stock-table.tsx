import React, { useDeferredValue, useEffect, useMemo, useState } from "react";

import useSession from "../../hooks/useSession";

import SearchBar from "../common/search-bar/search-bar";
import TableHeader from "../common/table/table-header/table-header";
import Pagination from "../common/pagination/pagination";
import TableBody from "../common/table/table-body/table-body";

import { api } from "../../utils/api";

import { type Stock } from "../../types/stock-types";

interface TableProps {
  isSelectable?: boolean;
  isEditable?: boolean;
}

const PAGE_SIZE = 10;
const StockTable: React.FC<TableProps> = ({ isSelectable, isEditable }) => {
  const session = useSession();

  const { data, isLoading, error, refetch } = api.stocks.getStocks.useQuery({
    userId: session ? session?.id : "",
  });

  const [stocksData, setStocksData] = useState<Stock[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [searchLabel, setSearchLabel] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const deferredSearchLabel = useDeferredValue(searchLabel);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const stocks = Object.values(data);
      setStocksData(stocks);
    }
  }, [data, error, isLoading]);

  const addStocksToWatchlistMutation =
    api.stocks.addUserStocksToWatchList.useMutation();
  const removeStocksToWatchlistMutation =
    api.stocks.removeUserStocksToWatchList.useMutation();

  const headers = ["Symbol - Name", "Price", "Change %"];

  const pageCount = useMemo(
    () => Math.ceil(stocksData.length / PAGE_SIZE),
    [stocksData]
  );

  const handleEdit = (isEdit: boolean) => {
    if (isEdit) {
      console.log("🚀 ~ SAVING ~ stocksData:", stocksData);
      // TODO: Save stocksData to DB
    }
    setIsEdit(!isEdit);
  };

  const toggleFavorite = async (stock: Stock) => {
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
  };

  return (
    <div className="relative w-full overflow-x-auto p-2 shadow-md sm:rounded-lg">
      <div className="flex flex-row justify-between ">
        <SearchBar
          id="table-search"
          value={deferredSearchLabel}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setSearchLabel(target.value)
          }
        />

        {isEditable ? (
          <button
            onClick={() => handleEdit(isEdit)}
            type="button"
            className="mb-4 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            {isEdit ? "Done" : "Sort"}
          </button>
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <TableHeader
            isSelectable={isSelectable}
            headers={headers}
            isEdit={isEdit}
          />
          <TableBody
            data={stocksData}
            setData={setStocksData}
            searchLabel={searchLabel}
            pageSize={PAGE_SIZE}
            isSelectable={isSelectable}
            pageNumber={pageNumber}
            onFavoriteChange={(item) => toggleFavorite(item)}
            isEdit={isEdit}
          />
        </table>
        <div className="flex justify-center">
          <Pagination
            count={pageCount}
            pageNumber={pageNumber}
            onPageChange={(value: number) => setPageNumber(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StockTable;
