import { PRIORITY_MATRIX } from "../../constants/constants";
import { SidebarListing } from "./sidebar-listing";

export const Sidebar = () => {
  return (
    <div className="w-[320px] h-full rounded-[20px] bg-tma-light-100 py-10 flex flex-col gap-10">
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center gap-[6px] w-25">
          <img className="w-[60px] aspect-square" src="/public/tma_logo.svg" />
          <p className="text-tma-blue-200 text-2xl uppercase font-black text-center">
            {PRIORITY_MATRIX}
          </p>
        </div>
      </div>
      <SidebarListing />
    </div>
  );
};
