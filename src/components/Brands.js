/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

export const Brands = ({ clients, className, ...rest }) => {
  return (
    <div
      className={cn(
        "w-full flex flex-wrap justify-center items-center gap-px",
        className
      )}
      {...rest}
    >
      
    </div>
  );
};
