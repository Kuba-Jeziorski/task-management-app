import Tooltip from "@mui/material/Tooltip";
import type { ReactElement } from "react";

type TooltipProps = {
  title: string;
  children: ReactElement;
};

export const CustomTooltip = ({ title, children }: TooltipProps) => {
  return (
    <Tooltip
      title={title}
      slotProps={{
        tooltip: {
          className:
            "!bg-tma-light-100 shadow-xl !text-base !text-tma-blue-200 shadow-gray-300/30 ring-1 ring-gray-200 rounded-lg",
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
