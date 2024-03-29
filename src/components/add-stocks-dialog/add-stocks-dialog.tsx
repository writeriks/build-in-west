import React, { useDeferredValue, useMemo, useState } from "react";

import useSession from "../../hooks/useSession";
import { useValidateData } from "../../hooks/use-validate-data";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Combobox } from "../ui/combobox";
import { CommandItem } from "../ui/command";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import StockDialogTrigger from "./stock-dialog-trigger";
import AddStocksDialogHeader from "./add-stocks-dialog-header";
import StockDialogFooter from "./stock-dialog-footer";

import { api } from "../../utils/api";

import { type Stock } from "../../types/stock-types";
import { useDispatch } from "react-redux";
import { setShouldRefetchUserStocks } from "../../store/reducers/ui-reducer/ui-slice";
import {
  calculateTotalBuyAmount,
  filterDropdownData,
  transformStockstoDropdownData,
} from "./add-stocks-dialog-helper";
interface AddStockModalProps {
  stocks: Stock[];
}

const AddStockDialog: React.FC<AddStockModalProps> = ({ stocks }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedStockName, setSelectedStockName] = useState<string>("");
  const [quantityInput, setQuantityInput] = useState<number>(0);
  const [stockPrice, setStockPrice] = useState<number>(0);
  const [selectedStocObject, setSelectedStocObject] = useState<Stock>();

  const [open, setOpen] = React.useState(false);

  const session = useSession();

  const { toast } = useToast();
  const dispatch = useDispatch();

  const addStocksToWatchlistMutation =
    api.stocks.addUserStocksToWatchList.useMutation({
      onSuccess: () =>
        toast({
          title: "Stock added to watchlist",
          description: "Successfully added stock to watchlist",
          duration: 3000,
        }),
    });

  const transformedStocks = useMemo(
    () => transformStockstoDropdownData(stocks),
    [stocks]
  );

  const filteredStocks = useMemo(() => {
    if (!inputValue) {
      return null;
    }
    return filterDropdownData(transformedStocks, inputValue).slice(0, 5);
  }, [inputValue, transformedStocks]);

  const calculatedAmount = useMemo(
    () =>
      calculateTotalBuyAmount(selectedStocObject!, stockPrice, quantityInput),
    [quantityInput, selectedStocObject, stockPrice]
  );

  const debouncedStocks = useDeferredValue(filteredStocks);

  const isDataValidated = useValidateData([
    selectedStocObject,
    quantityInput,
    stockPrice,
  ]);

  const handleSelection = (value: string) => {
    setSelectedStockName(value);

    const stockSymbol = value.split(" ")[0];
    const selectedStockData = stocks.find(
      (stock) => stock.symbol.toUpperCase() === stockSymbol?.toUpperCase()
    );
    setSelectedStocObject(selectedStockData);
    setStockPrice(selectedStockData?.lastPrice ?? 0);
    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const renderDropdownOptions = () =>
    debouncedStocks?.length ? (
      debouncedStocks.map((stock, index) => (
        <CommandItem className="w-full" key={index} onSelect={handleSelection}>
          {stock.label}
        </CommandItem>
      ))
    ) : (
      <></>
    );

  const onDialogClose = () => {
    setInputValue("");
    setSelectedStockName("");
    setSelectedStocObject(undefined);
    setQuantityInput(0);
    setStockPrice(0);
  };

  const handleStockAdd = async () => {
    if (selectedStocObject) {
      try {
        await addStocksToWatchlistMutation.mutateAsync({
          userId: session ? session?.id : "",
          buyPrice: stockPrice ?? 0,
          stockSymbol: selectedStocObject.symbol,
          quantitiy: quantityInput,
          stockName: selectedStocObject.name,
        });
        dispatch(setShouldRefetchUserStocks(true));
        onDialogClose();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No stock object", selectedStocObject);
    }
  };

  return (
    <Dialog onOpenChange={() => onDialogClose()}>
      <StockDialogTrigger
        buttonProps={{ variant: "outline" }}
        title="Add New Stock"
      />
      <Toaster />

      <DialogContent className="w-full">
        <AddStocksDialogHeader
          title="Add New Stock"
          description="Add new stock to your portfolio"
        />

        <div className="grid grid-flow-row gap-3">
          <div className="xsm:w-full grid items-center gap-1.5 md:w-auto">
            <Label
              className="md:text-md text-ct-teal-600 xsm:text-sm px-1 text-left font-bold capitalize"
              htmlFor="stock-search"
            >
              Stock
            </Label>

            <Combobox
              notFoundLabel="Stock does not exist..."
              inputValue={inputValue}
              onInputChange={handleInputChange}
              id="stock-search"
              selectedItem={selectedStockName.toUpperCase()}
              placeholder="Search for stock"
              items={debouncedStocks!}
              onSelect={handleSelection}
              renderOptions={renderDropdownOptions}
              isDropdownOpen={open}
              setIsDropdownOpen={setOpen}
              comboboxClass="justify-between w-full "
              popoverClass="p-0 w-full"
            />
          </div>

          <div className="xsm:w-full md:w-auto">
            <Label
              className="md:text-md text-ct-teal-600 xsm:text-sm px-1 text-left font-bold capitalize"
              htmlFor="stock-price"
            >
              Price
            </Label>
            <Input
              className="w-full"
              type="number"
              id="stock-price"
              title="Quantity"
              value={stockPrice || selectedStocObject?.lastPrice}
              onChange={(e) => setStockPrice(Number(e.target.value))}
            />
          </div>

          <div className="xsm:w-full grid items-center gap-1.5 md:w-auto">
            <Label
              className="md:text-md text-ct-teal-600 xsm:text-sm px-1 text-left font-bold capitalize"
              htmlFor="stock-quantity"
            >
              Quantity
            </Label>
            <Input
              className="w-full"
              type="number"
              id="stock-quantity"
              title="Quantity"
              value={quantityInput}
              onChange={(e) => setQuantityInput(Number(e.target.value))}
            />
          </div>

          <div className="xsm:w-full md:w-auto">
            <Label
              className="md:text-md text-ct-teal-600 xsm:text-sm px-1 text-left font-bold capitalize"
              htmlFor="stock-amount"
            >
              Amount
            </Label>
            <Label
              className="md:text-md text-ct-teal-600 xsm:text-sm px-1 text-left capitalize"
              id="stock-amount"
            >
              {calculatedAmount} TRY
            </Label>
          </div>
        </div>

        <StockDialogFooter
          onAddStock={handleStockAdd}
          onDialogClose={onDialogClose}
          addButtonDisabled={!isDataValidated}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddStockDialog;
