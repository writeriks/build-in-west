import React, { useDeferredValue, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Stock } from "../../types/stock-types";
import { Combobox } from "../ui/combobox";
import { CommandItem } from "../ui/command";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface AddStockModalProps {
  stocks: Stock[];
}

const AddStockModal: React.FC<AddStockModalProps> = ({ stocks }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedStockName, setSelectedStockName] = useState<string>("");
  const [quantityInput, setQuantityInput] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedStocObject, setSelectedStocObject] = useState<Stock>();

  const [open, setOpen] = React.useState(false);

  const transformedStocks = useMemo(
    () =>
      stocks.map((stock) => ({
        label: `${stock.symbol} ${stock.name}`,
        value: stock.symbol,
      })),
    [stocks]
  );

  const filteredStocks = useMemo(() => {
    if (!inputValue) {
      return null;
    }
    return transformedStocks
      .filter((stock) =>
        stock.label.toUpperCase().includes(inputValue.toUpperCase())
      )
      .slice(0, 5);
  }, [inputValue, transformedStocks]);

  const calculatedAmount = useMemo(() => {
    if (!selectedStocObject?.lastPrice) {
      return 0;
    }
    const amount = Number(selectedStocObject?.lastPrice) * quantityInput;
    return parseFloat(amount.toFixed(2));
  }, [quantityInput, selectedStocObject?.lastPrice]);

  const debouncedStocks = useDeferredValue(filteredStocks);

  const handleSelection = (value: string) => {
    setSelectedStockName(value);

    const stockSymbol = value.split(" ")[0];
    const selectedStockData = stocks.find(
      (stock) => stock.symbol.toUpperCase() === stockSymbol?.toUpperCase()
    );
    setSelectedStocObject(selectedStockData);

    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const renderDropdownOptions = () =>
    debouncedStocks?.length ? (
      debouncedStocks.map((stock, index) => (
        <CommandItem
          className="xsm:w-full md:w-[250px]"
          key={index}
          onSelect={handleSelection}
        >
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
  };

  return (
    <Dialog onOpenChange={() => onDialogClose()}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Stock</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Stock</DialogTitle>
          <DialogDescription>Add new stock to your portfolio</DialogDescription>
        </DialogHeader>
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
              placeholder="Please search for a stock..."
              items={debouncedStocks!}
              onSelect={handleSelection}
              renderOptions={renderDropdownOptions}
              isDropdownOpen={open}
              setIsDropdownOpen={setOpen}
              comboboxClass="justify-between w-full"
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
            <Label
              className="md:text-md text-ct-teal-600 xsm:text-sm px-1 text-left capitalize"
              id="stock-price"
            >
              {selectedStocObject?.lastPrice}
            </Label>
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
        <DialogFooter className="sm:justify-start">
          <Button type="button">Add Stock</Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onDialogClose()}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStockModal;
