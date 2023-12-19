import React, {
  type ReactNode,
  useDeferredValue,
  useMemo,
  useState,
} from "react";

import SearchBar from "../common/search-bar/search-bar";
import TableHeader from "../common/table/table-header/table-header";
import Pagination from "../common/pagination/pagination";
import TableBody from "../common/table/table-body/table-body";

import { type Stock } from "../../types/stock-types";

interface TableProps {
  isSelectable?: boolean;
  headers: string[];
  data: Stock[];
  cellStyles?: ReactNode[];
  isEditable?: boolean;
}

const PAGE_SIZE = 10;
const StockTable: React.FC<TableProps> = ({
  isSelectable,
  headers,
  data,
  isEditable,
}) => {
  const [stocksData, setStocksData] = useState(data);
  const [isEdit, setIsEdit] = useState(false);
  const [searchLabel, setSearchLabel] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const deferredSearchLabel = useDeferredValue(searchLabel);

  const pageCount = useMemo(
    () => Math.ceil(stocksData.length / PAGE_SIZE),
    [stocksData]
  );

  const handleEdit = (isEdit: boolean) => {
    console.log("🚀 ~ file: stock-table.tsx:55 ~ handleEdit ~ isEdit:", isEdit);
    if (isEdit) {
      console.log("Saved");
      console.log("🚀 ~ file: stock-table.tsx:33 ~ stocksData:", stocksData);
      // TODO: Save stocksData to DB
    }
    setIsEdit(!isEdit);
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
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <TableHeader
          isSelectable={isSelectable}
          isEdit={isEdit}
          headers={headers}
        />
        <TableBody
          data={stocksData}
          setData={setStocksData}
          searchLabel={searchLabel}
          pageSize={PAGE_SIZE}
          isEdit={isEdit}
          isSelectable={isSelectable}
          pageNumber={pageNumber}
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
  );
};

export default StockTable;
