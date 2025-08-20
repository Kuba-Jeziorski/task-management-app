import { Outlet } from "react-router-dom";

import { Sidebar } from "./the-sidebar";

export const AppLayout = () => {
  return (
    <div className="w-full p-10 flex flex-wrap gap-10 items-center h-full">
      <Sidebar />
      <div className="flex-1 h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};
