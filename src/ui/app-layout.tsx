import { Outlet } from "react-router-dom";

import { PRIORITY_MATRIX } from "../constants/constants";

import { Title } from "./the-title";
import { SidebarListing } from "./sidebar-listing";

export const AppLayout = () => {
  return (
    <div className="w-full p-10 flex flex-wrap gap-10 items-center h-full">
      <div className="w-[320px] h-full rounded-[20px] bg-tma-light-100 py-10 flex flex-col gap-[60px]">
        <Title as="p">{PRIORITY_MATRIX}</Title>
        <SidebarListing />
      </div>
      <div className="flex-1 h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};
