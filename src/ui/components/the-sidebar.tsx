import { PRIORITY_MATRIX } from "../../constants/constants";
import { SidebarListing } from "./sidebar-listing";

export const Sidebar = () => {
  return (
    <div className="w-[320px] h-full rounded-[20px] bg-tma-light-100 py-10 flex flex-col gap-[60px]">
      <p className="text-tma-blue-200 text-2xl uppercase font-black text-center">
        {PRIORITY_MATRIX}
      </p>
      <SidebarListing />
    </div>
  );
};
