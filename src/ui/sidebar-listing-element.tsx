import { Link, useLocation } from "react-router";
import type { SidebarElement } from "../constants/types";
import { cn } from "../utils/css";

type Props = {
  element: SidebarElement;
};

export const SidebarListingElement = ({ element }: Props) => {
  const { pathname } = useLocation();
  const isCurrent = pathname === element.url;

  return (
    <Link
      to={element.url}
      className={cn(
        "flex pl-5 items-center cursor-pointer h-[76px] transition-all duration-300 group justify-between",
        isCurrent ? "bg-tma-light-400" : null,
        "hover:bg-tma-light-400"
      )}
      key={element.url}
    >
      <div className="flex gap-5 items-center pr-5">
        <span
          className={cn(
            isCurrent ? "text-tma-blue-200" : "text-tma-light-600",
            "group-hover:text-tma-blue-200"
          )}
        >
          {element.icon}
        </span>
        <p
          className={cn(
            "uppercase leading-none font-semibold text-lg line-clamp-1",
            isCurrent ? "text-tma-blue-200" : "text-tma-light-600",
            "group-hover:text-tma-blue-200"
          )}
        >
          {element.name}
        </p>
      </div>
      <div
        className={cn(
          "w-[6px] min-w-[6px] flex h-full",
          isCurrent ? "bg-tma-blue-200" : null,
          "group-hover:bg-tma-blue-200"
        )}
      ></div>
    </Link>
  );
};
