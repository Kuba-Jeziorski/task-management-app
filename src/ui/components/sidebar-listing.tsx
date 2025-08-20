import { sidebarElements } from "../../constants/sidebar-elements";
import { SidebarListingElement } from "./sidebar-listing-element";

export const SidebarListing = () => {
  return (
    <ul className="flex flex-col">
      {sidebarElements.map((element) => (
        <SidebarListingElement key={element.url} element={element} />
      ))}
    </ul>
  );
};
