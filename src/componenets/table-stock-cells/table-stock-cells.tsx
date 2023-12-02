import { type ReactNode } from "react";
import { type Stock } from "../../types/stock-types";

export const TableStockCells = (item: Stock): ReactNode[] => [
  <td
    key={1}
    scope="row"
    className="whitespace-nowrap px-3 py-1 font-medium text-gray-900 dark:text-white md:px-6 md:py-4"
  >
    {item.symbol} {item.name}
  </td>,

  <td key={2} className="px-3 py-1 md:px-6 md:py-4">
    {item.lastPrice}
  </td>,
  <td key={3} className="px-3 py-1 md:px-6 md:py-4">
    {item.change}
  </td>,
];
