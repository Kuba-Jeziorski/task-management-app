import { NavLink } from "react-router";

import type { SidebarElement } from "../../constants/types";
import { cn } from "../../utils/css";

type Props = {
  element: SidebarElement;
};

export const SidebarListingElement = ({
  element: { icon, url, name, disabled },
}: Props) => {
  return (
    <NavLink
      to={url}
      key={url}
      className={({ isActive }) =>
        cn(
          "flex pl-5 items-center cursor-pointer h-[76px] transition-all duration-300 group justify-between  border-r-[6px] border-r-transparent max-custom-1440:h-16 max-custom-600:px-5 max-custom-600:border-r-0 max-custom-600:border-t-[6px] max-custom-600:border-t-transparent max-custom-480:px-2",
          isActive &&
            "bg-tma-light-400 border-r-tma-blue-200 max-custom-600:border-t-tma-blue-200",
          "hover:bg-tma-light-400",
          disabled && "opacity-50 pointer-events-none",
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex gap-5 items-center pr-5 max-custom-600:pr-0">
            <span
              className={cn(
                isActive ? "text-tma-blue-200" : "text-tma-light-600",
                "group-hover:text-tma-blue-200",
              )}
            >
              {icon}
            </span>
            <p
              className={cn(
                "uppercase leading-none font-semibold text-lg line-clamp-1 max-custom-1440:text-base max-custom-900:hidden",
                isActive ? "text-tma-blue-200" : "text-tma-light-600",
                "group-hover:text-tma-blue-200",
              )}
            >
              {name}
            </p>
          </div>
        </>
      )}
    </NavLink>
  );
};
