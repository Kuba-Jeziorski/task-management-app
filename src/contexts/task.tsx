import { createContext, type SetStateAction } from "react";
import type { GroupName, Tasks } from "../constants/types";

type TaskContextProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenDropdown: boolean;
  setIsOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  groupName: GroupName | undefined;
  setGroupName: React.Dispatch<React.SetStateAction<GroupName | undefined>>;
  data: Tasks;
  setData: React.Dispatch<SetStateAction<Tasks>>;
  currentTaskId: number | undefined;
  setCurrentTaskId: React.Dispatch<SetStateAction<number | undefined>>;
};

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);
