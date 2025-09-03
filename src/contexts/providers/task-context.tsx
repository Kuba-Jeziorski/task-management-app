import { useEffect, useState } from "react";

import { TaskContext } from "../task";
import type { DialogType, GroupName, Tasks } from "../../constants/types";
import { useTasks } from "../../utils/use-tasks";

type Props = {
  children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: Props) => {
  const [dialogType, setDialogType] = useState<DialogType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [groupName, setGroupName] = useState<GroupName | undefined>(undefined);
  const [data, setData] = useState<Tasks>([]);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

  const { tasks = [] } = useTasks();

  useEffect(() => {
    setData(tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        dialogType,
        setDialogType,
        isDropdownOpen,
        setIsDropdownOpen,
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
