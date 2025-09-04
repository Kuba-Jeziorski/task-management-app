import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "h-12 px-3 z-1 pt-4 border border-tma-blue-200 rounded-xl outline-0 text-base leading-none font-semibold",
        "placeholder-transparent",
        className
      )}
      {...props}
    />
  );
};
