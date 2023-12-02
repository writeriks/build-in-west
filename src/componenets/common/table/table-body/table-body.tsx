import React from "react";
import TableRow from "../table-row/table-row";
import { TableStockCells } from "../../../table-stock-cells/table-stock-cells";
import { type Stock } from "../../../../types/stock-types";

interface TableBodyProps {
  isSelectable?: boolean;
  isSort: boolean;
  filteredList: Stock[];
  paginatedList: Stock[];
  pageSize: number;
  searchLabel: string;
}

const TableBody: React.FC<TableBodyProps> = ({
  filteredList,
  isSelectable,
  isSort,
  pageSize,
  paginatedList,
  searchLabel,
}) => (
  <tbody>
    {!!searchLabel
      ? filteredList
          .slice(0, pageSize)
          .map((item, index) => (
            <TableRow
              isSelectable={isSelectable}
              key={index}
              isEdit={isSort}
              cellStyles={TableStockCells(item)}
            />
          ))
      : paginatedList.map((item, index) => (
          <TableRow
            isSelectable={isSelectable}
            key={index}
            isEdit={isSort}
            cellStyles={TableStockCells(item)}
          />
        ))}
  </tbody>
);

export default TableBody;
