import type { ReactElement } from "react";

import { cn } from "../../utils/css";

type FormRowProps = {
  label: string;
  children: ReactElement<{ id: string }>;
  error?: string;
};

export const FormRow = ({ label, children, error }: FormRowProps) => {
  return (
    <div className={cn("flex flex-col gap-2 relative group")}>
      {label && children && (
        <label
          className={cn(
            "absolute left-3 text-sm leading-none transition-all duration-300 pointer-none",
            "top-[17px] group-has-[input:focus]:top-[6px]",
            "group-has-[input:not(:placeholder-shown)]:top-[6px]"
          )}
          htmlFor={children.props.id}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="absolute right-3 text-sm leading-none top-[17px] text-tma-danger select-none">
          {error}
        </p>
      )}
    </div>
  );
};
