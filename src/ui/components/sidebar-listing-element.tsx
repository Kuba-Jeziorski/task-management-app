import { NavLink } from "react-router";

import type { SidebarElement } from "../../constants/types";
import { cn } from "../../utils/css";

type Props = {
  element: SidebarElement;
};

export const SidebarListingElement = ({ element }: Props) => {
  return (
    <NavLink
      to={element.url}
      key={element.url}
      className={({ isActive }) =>
        cn(
          "flex pl-5 items-center cursor-pointer h-[76px] transition-all duration-300 group justify-between",
          isActive ? "bg-tma-light-400" : null,
          "hover:bg-tma-light-400"
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex gap-5 items-center pr-5">
            <span
              className={cn(
                isActive ? "text-tma-blue-200" : "text-tma-light-600",
                "group-hover:text-tma-blue-200"
              )}
            >
              {element.icon}
            </span>
            <p
              className={cn(
                "uppercase leading-none font-semibold text-lg line-clamp-1",
                isActive ? "text-tma-blue-200" : "text-tma-light-600",
                "group-hover:text-tma-blue-200"
              )}
            >
              {element.name}
            </p>
          </div>
          <div
            className={cn(
              "w-[6px] min-w-[6px] flex h-full",
              isActive ? "bg-tma-blue-200" : null,
              "group-hover:bg-tma-blue-200"
            )}
          />
        </>
      )}
    </NavLink>
  );
};
