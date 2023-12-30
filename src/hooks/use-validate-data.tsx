import { useMemo } from "react";
import { type Stock } from "../types/stock-types";

type InputTypes =
  | string
  | number
  | boolean
  | string[]
  | Record<string, unknown>
  | Stock
  | undefined;

const validateInputForType = (input: InputTypes): boolean => {
  if (Array.isArray(input)) {
    return !!input && input.length > 0;
  }

  if (typeof input === "object" && input !== null) {
    return !!Object.keys(input).length;
  }

  switch (typeof input) {
    case "boolean":
      return input;
    case "number":
      return !!input && input > 0;
    case "string":
    default:
      return !!input && input !== "";
  }
};

export const useValidateData = (inputs: InputTypes[]): boolean => {
  const isDataValid = useMemo(() => {
    return inputs.every((input) => validateInputForType(input));
  }, [inputs]);

  return isDataValid;
};
