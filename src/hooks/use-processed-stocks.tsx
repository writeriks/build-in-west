import { type UserStock } from "@prisma/client";
import { useEffect } from "react";
import { type Stock } from "../types/stock-types";

const useProcessedStocks = (
  setLoadingStocks: (value: boolean) => void,
  setStocksArray: (array: Stock[]) => void,
  userStocks: UserStock[] | undefined,
  stocks?: Record<string, Stock>
) => {
  useEffect(() => {
    if (userStocks && stocks) {
      const processedStocks = userStocks.map((userStock) => {
        const stock = stocks[userStock.symbol];
        const profit = stock
          ? parseFloat(
              (
                parseFloat(
                  (
                    parseFloat(stock.lastPrice.toFixed(2)) * userStock.quantity
                  ).toFixed(2)
                ) -
                parseFloat(
                  (
                    parseFloat(userStock.buyPrice.toFixed(2)) *
                    userStock.quantity
                  ).toFixed(2)
                )
              ).toFixed(2)
            )
          : 0;

        const profitPercentage = stock
          ? ((stock.lastPrice - userStock.buyPrice) / userStock.buyPrice) * 100
          : 0;

        return {
          id: stock?.id ?? "",
          symbol: stock?.symbol ?? "",
          name: stock?.name ?? "",
          lastPrice: stock?.lastPrice ?? 0,
          profit,
          profitPercentage,
          quantity: userStock.quantity,
          averageCost: userStock.buyPrice,
          change: stock?.change ?? "0",
          volume: stock?.volume ?? "",
          lastUpdate: stock?.lastUpdate ?? "",
          isFavorite: true,
        };
      });

      setStocksArray(processedStocks);
      setLoadingStocks(false);
    }
  }, [userStocks, stocks, setStocksArray, setLoadingStocks]);
};

export default useProcessedStocks;
