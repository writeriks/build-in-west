import React, { type ReactNode } from "react";
import { cn } from "../../../utils/cn/cn-lib";

interface TailwindMaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

const TailwindMaxWidthWrapper: React.FC<TailwindMaxWidthWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default TailwindMaxWidthWrapper;
