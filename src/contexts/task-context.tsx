import { useState } from "react";

import type { DialogType, GroupName } from "../constants/types";
import { useTasks } from "../hooks/use-tasks";
import { TaskContext } from "./task";

type Props = {
  children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: Props) => {
  const [dialogType, setDialogType] = useState<DialogType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [groupName, setGroupName] = useState<GroupName | undefined>(undefined);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

  const { tasks = [] } = useTasks();

  return (
    <TaskContext.Provider
      value={{
        dialogType,
        setDialogType,
        isDropdownOpen,
        setIsDropdownOpen,
        groupName,
        setGroupName,
        data: tasks,
        currentTaskId,
        setCurrentTaskId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
