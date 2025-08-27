import { cva } from "class-variance-authority";

import { cn } from "../../utils/css";

export const buttonVariants = cva(
  cn(
    "px-5 py-3 rounded-md border font-semibold leading-none cursor-pointer transition-all duration-300"
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "border-tma-blue-200 bg-tma-blue-200 text-tma-light-100",
          "hover:border-tma-blue-100 hover:bg-tma-blue-100"
        ),
        danger: cn(
          "border-tma-danger bg-tma-danger text-tma-light-100 opacity-75",
          "hover:opacity-100"
        ),
      },
    },
  }
);
