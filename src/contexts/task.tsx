import { createContext, type SetStateAction } from "react";

import type { DialogType, GroupName, Tasks } from "../constants/types";

type TaskContextProps = {
  dialogType: DialogType | null;
  setDialogType: React.Dispatch<React.SetStateAction<DialogType | null>>;
  isOpenDropdown: boolean;
  setIsOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  groupName: GroupName | undefined;
  setGroupName: React.Dispatch<React.SetStateAction<GroupName | undefined>>;
  data: Tasks;
  setData: React.Dispatch<SetStateAction<Tasks>>;
  currentTaskId: number | null;
  setCurrentTaskId: React.Dispatch<SetStateAction<number | null>>;
};

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);
