import { Edit2, Trash } from "lucide-react";
import { EDIT, REMOVE } from "./constants";
import type { DropdownOptionElements } from "./types";

export const dropdownOptionElements: DropdownOptionElements = [
  {
    icon: <Edit2 size={18} />,
    name: EDIT,
    className: "text-tma-blue-100 group-hover:text-tma-blue-200",
  },
  {
    icon: <Trash size={18} />,
    name: REMOVE,
    className: "text-tma-danger-darker group-hover:text-tma-danger",
  },
];
