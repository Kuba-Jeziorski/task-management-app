import { useEffect, useState } from "react";

import { TaskGroup } from "./task-group";
import {
  EDIT,
  GROUP_DECIDE,
  GROUP_DECIDE_DESCRIPTION,
  GROUP_DELEGATE,
  GROUP_DELETE,
  GROUP_DELETE_DESCRIPTION,
  GROUP_DO,
  GROUP_DO_DESCRIPTION,
  NEW,
  TASK_EDITING,
} from "../../constants/constants";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { Dialog } from "../primitives/dialog";
import { Form } from "./form";
import type { Task } from "../../constants/types";

export const TaskGrid = () => {
  const {
    data,
    dialogType,
    setDialogType,
    currentTaskId,
    groupName,
    setGroupName,
  } = useTaskContext();

  const [currentTask, setCurrentTask] = useState<Task>();

  useEffect(() => {
    if (currentTaskId) {
      const selectedTask = data.filter((task) => task.id === currentTaskId)[0];
      setCurrentTask(selectedTask);
    }
  }, [data, currentTaskId]);

  const doTasks = data.filter((task) => task.group === GROUP_DO);
  const decideTasks = data.filter((task) => task.group === GROUP_DECIDE);
  const delegateTasks = data.filter((task) => task.group === GROUP_DELEGATE);
  const deleteTasks = data.filter((task) => task.group === GROUP_DELETE);

  const isDialogOpen =
    (dialogType === NEW && groupName) || (dialogType === EDIT && currentTaskId);

  const handleCloseDialog = () => {
    setDialogType(null);
    setGroupName(undefined);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-10">
      <TaskGroup
        title={GROUP_DO}
        description={GROUP_DO_DESCRIPTION}
        tasks={doTasks}
      />
      <TaskGroup
        title={GROUP_DECIDE}
        description={GROUP_DECIDE_DESCRIPTION}
        tasks={decideTasks}
      />
      <TaskGroup
        title={GROUP_DELEGATE}
        description={GROUP_DELETE_DESCRIPTION}
        tasks={delegateTasks}
      />
      <TaskGroup
        title={GROUP_DELETE}
        description={GROUP_DELETE_DESCRIPTION}
        tasks={deleteTasks}
      />
      {isDialogOpen && (
        <Dialog closeFn={handleCloseDialog}>
          <div className="flex gap-3 flex-col" data-task={dialogType}>
            {dialogType === NEW ? (
              <p className="text-lg text-tma-blue-200">
                Add new task to the{" "}
                <span className="font-black uppercase">{groupName}</span> group
              </p>
            ) : (
              <p className="text-lg text-tma-blue-200 line-clamp-1">
                {TASK_EDITING}{" "}
                <span className="font-black uppercase">
                  {currentTask?.name}
                </span>
              </p>
            )}

            <Form />
          </div>
        </Dialog>
      )}
    </div>
  );
};
