import React from "react";
import Lottie from "react-lottie";

import * as noResultAnimation from "../../../../public/assets/no-result-animation.json";
import { defaultAnimationProps } from "../../../utils/lottie-service";
import { TableCell, TableRow } from "../../ui/table";

const TableEmptyRow = () => (
  <TableRow className="relative h-40 w-full">
    <TableCell className="bg-light-blue-200 absolute left-1/2 -translate-x-1/2 transform p-4">
      <Lottie
        options={defaultAnimationProps(noResultAnimation)}
        isClickToPauseDisabled={true}
        width={100}
        height={100}
      />
      <span className="p-3  ">No results...</span>
    </TableCell>
  </TableRow>
);

export default TableEmptyRow;
