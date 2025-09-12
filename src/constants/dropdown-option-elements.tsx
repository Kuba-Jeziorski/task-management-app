import { Edit2, Trash } from "lucide-react";

import {
  DROPDOWN_NAME_REWARD_EDIT,
  DROPDOWN_NAME_REWARD_REMOVE,
  DROPDOWN_NAME_TASK_EDIT,
  DROPDOWN_NAME_TASK_REMOVE,
} from "./constants";
import type { DropdownOptionElements } from "./types";

export const dropdownTaskOptionElements: DropdownOptionElements = [
  {
    icon: <Edit2 size={18} />,
    name: DROPDOWN_NAME_TASK_EDIT,
    className: "text-tma-blue-100 group-hover:text-tma-blue-200",
  },
  {
    icon: <Trash size={18} />,
    name: DROPDOWN_NAME_TASK_REMOVE,
    className: "text-tma-danger-darker group-hover:text-tma-danger",
  },
];

export const dropdownRewardOptionElements: DropdownOptionElements = [
  {
    icon: <Edit2 size={18} />,
    name: DROPDOWN_NAME_REWARD_EDIT,
    className: "text-tma-blue-100 group-hover:text-tma-blue-200",
  },
  {
    icon: <Trash size={18} />,
    name: DROPDOWN_NAME_REWARD_REMOVE,
    className: "text-tma-danger-darker group-hover:text-tma-danger",
  },
];
