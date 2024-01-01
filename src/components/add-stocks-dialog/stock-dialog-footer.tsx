import React from "react";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

interface StockDialogFooterProps {
  onDialogClose: () => void;
  onAddStock: () => void;
  addButtonDisabled: boolean;
}

const StockDialogFooter: React.FC<StockDialogFooterProps> = ({
  onDialogClose,
  onAddStock,
  addButtonDisabled,
}) => {
  return (
    <DialogFooter className="sm:justify-start">
      <DialogClose asChild>
        <Button type="button" onClick={onAddStock} disabled={addButtonDisabled}>
          Add Stock
        </Button>
      </DialogClose>
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
  );
};

export default StockDialogFooter;
