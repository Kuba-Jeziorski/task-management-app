import { useEffect, useState } from "react";

import { TaskContext } from "../task";
import type { DialogType, GroupName, Tasks } from "../../constants/types";
import {
  GROUP_DECIDE,
  GROUP_DELEGATE,
  GROUP_DELETE,
  GROUP_DO,
} from "../../constants/constants";

type Props = {
  children: React.ReactNode;
};

const dummyData: Tasks = [
  { id: 1, group: GROUP_DO, name: "Task name 1", active: true },
  { id: 2, group: GROUP_DO, name: "Task name 2", active: true },
  { id: 3, group: GROUP_DO, name: "Task name 3", active: false },
  { id: 4, group: GROUP_DO, name: "Task name 4", active: true },

  { id: 5, group: GROUP_DECIDE, name: "Task name 5", active: true },
  { id: 6, group: GROUP_DECIDE, name: "Task name 6", active: false },
  { id: 7, group: GROUP_DECIDE, name: "Task name 7", active: true },
  { id: 8, group: GROUP_DECIDE, name: "Task name 8", active: true },
  { id: 9, group: GROUP_DECIDE, name: "Task name 9", active: false },

  { id: 10, group: GROUP_DELEGATE, name: "Task name 10", active: true },
  { id: 11, group: GROUP_DELEGATE, name: "Task name 11", active: true },
  { id: 12, group: GROUP_DELEGATE, name: "Task name 12", active: false },
  { id: 13, group: GROUP_DELEGATE, name: "Task name 13", active: true },
  { id: 14, group: GROUP_DELEGATE, name: "Task name 14", active: true },
  { id: 15, group: GROUP_DELEGATE, name: "Task name 15", active: false },

  { id: 16, group: GROUP_DELETE, name: "Task name 16", active: true },
  { id: 17, group: GROUP_DELETE, name: "Task name 17", active: false },
  { id: 18, group: GROUP_DELETE, name: "Task name 18", active: true },
  { id: 19, group: GROUP_DELETE, name: "Task name 19", active: true },
  { id: 20, group: GROUP_DELETE, name: "Task name 20", active: false },
  { id: 21, group: GROUP_DELETE, name: "Task name 21", active: true },
  { id: 22, group: GROUP_DELETE, name: "Task name 22", active: true },
  { id: 23, group: GROUP_DELETE, name: "Task name 23", active: false },
  { id: 24, group: GROUP_DELETE, name: "Task name 24", active: true },
];

export const TaskContextProvider = ({ children }: Props) => {
  const [dialogType, setDialogType] = useState<DialogType | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [groupName, setGroupName] = useState<GroupName | undefined>(undefined);
  const [data, setData] = useState<Tasks>([]);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

  useEffect(() => {
    setData(dummyData);
  }, []);

  return (
    <TaskContext.Provider
      value={{
        dialogType,
        setDialogType,
        isOpenDropdown,
        setIsOpenDropdown,
        groupName,
        setGroupName,
        data,
        setData,
        currentTaskId,
        setCurrentTaskId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
