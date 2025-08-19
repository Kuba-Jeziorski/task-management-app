import { SidebarListingElement } from "./sidebar-listing-element";
import { sidebarElements } from "../constants/sidebar-elements";

export const SidebarListing = () => {
  return (
    <ul className="flex flex-col">
      {sidebarElements.map((element) => (
        <SidebarListingElement key={element.url} element={element} />
      ))}
    </ul>
  );
};
