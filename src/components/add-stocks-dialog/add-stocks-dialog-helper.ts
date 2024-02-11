import { type Stock } from "../../types/stock-types";

interface DropdownData {
  label: string;
  value: string;
}

export const filterDropdownData = (
  dropdownData: DropdownData[],
  input: string
): DropdownData[] =>
  dropdownData.filter((data) =>
    data.label.toUpperCase().includes(input.toUpperCase())
  );

export const transformStockstoDropdownData = (
  stocks: Stock[]
): DropdownData[] => {
  return stocks.map((stock) => ({
    label: `${stock.symbol} ${stock.name}`,
    value: stock.symbol,
  }));
};

export const calculateTotalBuyAmount = (
  selectedStocObject: Stock,
  stockPrice: number,
  quantity: number
) => {
  if (!selectedStocObject?.lastPrice) {
    return 0;
  }

  let amount = 0;
  if (stockPrice > 0) {
    amount = stockPrice * quantity;
  } else {
    amount = Number(selectedStocObject?.lastPrice) * quantity;
  }
  return parseFloat(amount.toFixed(2));
};
