import { useState } from "react";

import type { GroupName } from "../constants/types";
import { useTasks } from "../hooks/use-tasks";
import { TaskContext } from "./task";

type Props = {
  children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: Props) => {
  const [groupName, setGroupName] = useState<GroupName | undefined>(undefined);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

  const { tasks = [] } = useTasks();

  return (
    <TaskContext.Provider
      value={{
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
