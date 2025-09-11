import { createContext, type SetStateAction } from "react";

import type { GroupName, Tasks } from "../constants/types";

type TaskContextProps = {
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  groupName: GroupName | undefined;
  setGroupName: React.Dispatch<React.SetStateAction<GroupName | undefined>>;
  data: Tasks;
  currentTaskId: number | null;
  setCurrentTaskId: React.Dispatch<SetStateAction<number | null>>;
};

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);
