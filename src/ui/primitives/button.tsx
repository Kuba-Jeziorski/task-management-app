import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button-variants";
import { cn } from "../../utils/css";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
  };

export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant }))} {...props}>
      {children}
    </button>
  );
};
