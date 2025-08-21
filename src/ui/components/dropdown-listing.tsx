import type { DropdownOptionElements } from "../../constants/types";
import { DropdownListingElement } from "./dropdown-listing-element";

type Props = {
  listing: DropdownOptionElements;
};

export const DropdownListing = ({ listing }: Props) => {
  return (
    <>
      {listing.map((option) => (
        <DropdownListingElement key={option.name} element={option} />
      ))}
    </>
  );
};
