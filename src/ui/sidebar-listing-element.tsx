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
        "flex px-5 items-center cursor-pointer gap-5 h-[76px] transition-all duration-300 group",
        isCurrent ? "bg-tma-light-400" : null,
        "hover:bg-tma-light-400"
      )}
      key={element.url}
    >
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
          "uppercase leading-none font-semibold text-lg",
          isCurrent ? "text-tma-blue-200" : "text-tma-light-600",
          "group-hover:text-tma-blue-200"
        )}
      >
        {element.name}
      </p>
    </Link>
  );
};
