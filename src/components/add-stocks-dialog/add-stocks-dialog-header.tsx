import React from "react";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddStocksDialogHeaderProps {
  title: string;
  description?: string;
}

const AddStocksDialogHeader: React.FC<AddStocksDialogHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : null}
      </DialogHeader>
    </>
  );
};

export default AddStocksDialogHeader;
