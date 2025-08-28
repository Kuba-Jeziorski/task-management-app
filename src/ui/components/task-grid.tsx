import { useEffect, useState } from "react";

import { TaskGroup } from "./task-group";
import {
  CONFIRMATION,
  EDIT,
  GROUP_DECIDE,
  GROUP_DECIDE_DESCRIPTION,
  GROUP_DELEGATE,
  GROUP_DELETE,
  GROUP_DELETE_DESCRIPTION,
  GROUP_DO,
  GROUP_DO_DESCRIPTION,
  NEW,
  NO,
  REMOVING,
  TASK_EDITING,
  TASK_REMOVING,
  YES,
} from "../../constants/constants";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { Dialog } from "../primitives/dialog";
import { Form } from "./form";
import type { Task } from "../../constants/types";
import { Button } from "../primitives/button";

export const TaskGrid = () => {
  const {
    data,
    setData,
    dialogType,
    setDialogType,
    currentTaskId,
    setCurrentTaskId,
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
    (dialogType === NEW && groupName) ||
    (dialogType === EDIT && currentTaskId) ||
    (dialogType === CONFIRMATION && currentTaskId);

  const removingTaskName =
    currentTaskId && data.filter((task) => task.id === currentTaskId)[0].name;

  const handleCloseDialog = () => {
    setDialogType(null);
    setGroupName(undefined);
  };

  const removeTask = () => {
    setData((prev) => prev.filter((task) => task.id !== currentTaskId));
    setCurrentTaskId(null);
    setDialogType(null);
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
            {dialogType === NEW && (
              <>
                <p className="title text-lg text-tma-blue-200">
                  Add new task to the{" "}
                  <span className="font-black uppercase">{groupName}</span>{" "}
                  group
                </p>
                <Form />
              </>
            )}
            {dialogType === EDIT && (
              <>
                <p className="title text-lg text-tma-blue-200 line-clamp-1">
                  {TASK_EDITING}{" "}
                  <span className="font-black uppercase">
                    {currentTask?.name}
                  </span>
                </p>
                <Form />
              </>
            )}
            {dialogType === CONFIRMATION && (
              <div className="flex flex-col gap-4">
                <p className="title text-lg text-tma-blue-200 line-clamp-1">
                  {`${REMOVING}: `}
                  {removingTaskName && (
                    <span className="font-black">{removingTaskName}</span>
                  )}
                </p>
                <p>{TASK_REMOVING}</p>
                <div className="flex gap-4">
                  <Button
                    variant={"danger"}
                    onClick={removeTask}
                    className="uppercase"
                  >
                    {YES}
                  </Button>
                  <Button
                    variant={"primary"}
                    onClick={handleCloseDialog}
                    className="uppercase"
                  >
                    {NO}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
};
