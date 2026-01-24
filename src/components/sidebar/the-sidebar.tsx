import { Link } from "react-router";
import { PRIORITY_MATRIX } from "../../constants/constants";
import { SidebarListing } from "./sidebar-listing";

export const Sidebar = () => {
  return (
    <aside className="w-[320px] h-full rounded-[20px] bg-tma-light-100 py-10 flex flex-col gap-10 max-custom-1440:w-[250px] max-custom-900:w-auto max-custom-600:fixed max-custom-600:left-0 max-custom-600:bottom-0 max-custom-600:h-16 max-custom-600:p-0 max-custom-600:rounded-none max-custom-600:w-full">
      <div className="w-full flex justify-center max-custom-600:hidden">
        <Link
          to="/"
          className="flex flex-col items-center gap-[6px] w-25 max-custom-900:w-full"
        >
          <img
            className="w-[60px] aspect-square max-custom-900:w-9"
            src="/tma_logo.svg"
          />
          <p className="text-tma-blue-200 text-2xl uppercase font-black text-center max-custom-900:hidden">
            {PRIORITY_MATRIX}
          </p>
        </Link>
      </div>
      <SidebarListing />
    </aside>
  );
};
