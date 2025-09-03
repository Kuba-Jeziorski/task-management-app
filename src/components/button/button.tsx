import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { buttonVariants } from "./button-variants";
import { cn } from "../../utils/css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    children: React.ReactNode;
  };

export const Button = ({
  variant,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  );
};
