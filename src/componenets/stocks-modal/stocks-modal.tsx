import React from "react";
import StockTable from "../stocks-table/stock-table";
import { api } from "../../utils/api";

interface StocksModalProps {
  isModal: boolean;
  setIsModal: (value: React.SetStateAction<boolean>) => void;
}

const StocksModal: React.FC<StocksModalProps> = ({ setIsModal, isModal }) => {
  const { data: stockData, isLoading, error } = api.stocks.getStocks.useQuery();
  console.log("🚀 ~ file: stocks-modal.tsx:9 ~ isModal:", isModal);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-700 opacity-75"></div>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      >
        <div className="relative max-h-full w-full max-w-2xl p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Stock
              </h3>
              <button
                type="button"
                className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => setIsModal(!isModal)}
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <StockTable data={Object.values(stockData)} />
            <div className="space-y-4 p-4 md:p-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StocksModal;
