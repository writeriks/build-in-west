import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import { Button, type ButtonProps } from "../ui/button";

interface StockDialogTriggerProps {
  buttonProps?: ButtonProps;
  title: string;
}

const StockDialogTrigger: React.FC<StockDialogTriggerProps> = ({
  buttonProps,
  title,
}) => (
  <>
    <DialogTrigger asChild>
      <Button {...buttonProps}>{title}</Button>
    </DialogTrigger>
  </>
);

export default StockDialogTrigger;
