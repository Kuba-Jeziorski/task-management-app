import { Link, Outlet } from "react-router-dom";

import { Sidebar } from "../sidebar/the-sidebar";
import { useUser } from "../../hooks/use-user";
import {
  HELLO_THERE,
  URL_AWARDS_PAGE,
  USER_NAME_PLACEHOLDER,
  YOU_ALREADY_GAINED,
} from "../../constants/constants";
import { Gem } from "lucide-react";
import { cn } from "../../utils/css";

export const AppLayout = () => {
  const { user } = useUser();
  const displayName = user?.user_metadata.fullName ?? USER_NAME_PLACEHOLDER;

  return (
    <div className="w-full p-10 flex flex-wrap gap-10 items-center h-full max-h-100vh">
      <Sidebar />
      <div className="flex-1 h-full w-full">
        <div className="flex flex-col flex-1 h-full w-full gap-10">
          <div className="bg-tma-light-100 rounded-2xl px-5 py-4 flex items-center justify-between">
            <p className="text-tma-blue-200 font-semibold text-2xl">
              {HELLO_THERE} <span className="font-black">{displayName}!</span>
            </p>
            <p className="text-tma-blue-200 font-semibold text-2xl flex items-center gap-2">
              {YOU_ALREADY_GAINED}
              <Link to={`/${URL_AWARDS_PAGE}`}>
                <span
                  className={cn(
                    "font-black flex gap-[6px] items-center text-tma-blue-200 transition-all duration-300",
                    "hover:text-tma-blue-100"
                  )}
                >
                  X <Gem size={26} />
                </span>
              </Link>
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
