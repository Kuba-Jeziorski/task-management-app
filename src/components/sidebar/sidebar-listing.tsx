import { sidebarElements } from "../../constants/sidebar-elements";
import { SidebarListingElement } from "./sidebar-listing-element";

export const SidebarListing = () => {
  return (
    <ul className="flex flex-col max-custom-600:flex-row max-custom-600:px-5 max-custom-600:justify-between max-custom-600:shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      {sidebarElements.map((element) => (
        <SidebarListingElement key={element.url} element={element} />
      ))}
    </ul>
  );
};
