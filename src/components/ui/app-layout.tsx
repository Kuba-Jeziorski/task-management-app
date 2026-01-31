import { Link, Outlet } from "react-router-dom";
import { Gem } from "lucide-react";
import { cn } from "../../utils/css";

import { Sidebar } from "../sidebar/the-sidebar";
import {
  BASE_CURRENT_POINTS,
  HELLO_THERE,
  URL_AWARDS_PAGE,
  USER_NAME_PLACEHOLDER,
  YOU_ALREADY_GAINED,
} from "../../constants/constants";
import { useProfile } from "../../hooks/use-profile";

export const AppLayout = () => {
  const profile = useProfile();
  const { name = USER_NAME_PLACEHOLDER, current_points = BASE_CURRENT_POINTS } =
    profile?.profile ?? {};

  return (
    <div className="w-full p-10 flex flex-wrap gap-10 items-center h-full max-h-100dvh overflow-hidden min-h-0 max-custom-1440:gap-6 max-custom-1152:p-5 max-custom-1152:gap-5">
      <Sidebar />
      <div className="flex-1 h-full w-full min-h-0">
        <div className="flex flex-col flex-1 h-full w-full gap-10 min-h-0 max-custom-1440:gap-6 max-custom-1152:gap-5">
          <div className="bg-tma-light-100 rounded-2xl px-5 py-4 flex items-center justify-between gap-6 flex-wrap max-custom-800:flex-col max-custom-800:items-start max-custom-800:gap-3">
            <p className="text-tma-blue-200 font-semibold text-2xl max-custom-1152:text-xl">
              {HELLO_THERE} <span className="font-black">{name}</span>!
            </p>
            <p className="text-tma-blue-200 font-semibold text-2xl flex items-center gap-2 max-custom-1152:text-xl">
              {YOU_ALREADY_GAINED}
              <Link to={`/${URL_AWARDS_PAGE}`}>
                <span
                  className={cn(
                    "font-black flex gap-[6px] items-center text-tma-blue-200 transition-all duration-300",
                    "hover:text-tma-blue-100",
                  )}
                >
                  {current_points} <Gem size={26} />
                </span>
              </Link>
            </p>
          </div>
          <div className="flex-1 min-h-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
