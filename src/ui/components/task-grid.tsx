import {
  ADD_NEW_TASK,
  CONFIRMATION,
  EDIT,
  GROUP_DECIDE,
  GROUP_DECIDE_DESCRIPTION,
  GROUP_DELEGATE,
  GROUP_DELEGATE_DESCRIPTION,
  GROUP_DELETE,
  GROUP_DELETE_DESCRIPTION,
  GROUP_DO,
  GROUP_DO_DESCRIPTION,
  NEW,
  REMOVE_NO,
  REMOVE_YES,
  REMOVING,
  TASK_EDITING,
  TASK_REMOVING,
} from "../../constants/constants";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { TaskGroup } from "./task-group";
import { Dialog } from "../primitives/dialog";
import { Form } from "./form";
import { Button } from "../primitives/button";
import type { Tasks } from "../../constants/types";
import { getTasks, removeTask } from "../../services/api-tasks";

type GroupedTasks = {
  [GROUP_DO]: Tasks;
  [GROUP_DECIDE]: Tasks;
  [GROUP_DELEGATE]: Tasks;
  [GROUP_DELETE]: Tasks;
};

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

  const currentTask = currentTaskId
    ? data.find((task) => task.id === currentTaskId)
    : undefined;

  const groupedTasks: GroupedTasks = {
    [GROUP_DO]: [],
    [GROUP_DECIDE]: [],
    [GROUP_DELEGATE]: [],
    [GROUP_DELETE]: [],
  };

  data.forEach((task) => {
    if (groupedTasks[task.group]) {
      groupedTasks[task.group].push(task);
    }
  });

  const isDialogOpen =
    (dialogType === NEW && groupName) ||
    (dialogType === EDIT && currentTaskId) ||
    (dialogType === CONFIRMATION && currentTaskId);

  const handleCloseDialog = () => {
    setDialogType(null);
    setGroupName(undefined);
    setCurrentTaskId(null);
  };

  // TODO keep for not logged-in users
  // const deleteTask = () => {
  //   if (currentTaskId != null) {
  //     setData((prev) => prev.filter((task) => task.id !== currentTaskId));
  //   }
  //   handleCloseDialog();
  // };

  const handleRemoveTask = async (id: number) => {
    if (currentTaskId != null) {
      removeTask(id);
      const freshTasks = await getTasks();
      setData(freshTasks);
    }
    handleCloseDialog();
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-10">
      <TaskGroup
        title={GROUP_DO}
        description={GROUP_DO_DESCRIPTION}
        tasks={groupedTasks[GROUP_DO]}
      />
      <TaskGroup
        title={GROUP_DECIDE}
        description={GROUP_DECIDE_DESCRIPTION}
        tasks={groupedTasks[GROUP_DECIDE]}
      />
      <TaskGroup
        title={GROUP_DELEGATE}
        description={GROUP_DELEGATE_DESCRIPTION}
        tasks={groupedTasks[GROUP_DELEGATE]}
      />
      <TaskGroup
        title={GROUP_DELETE}
        description={GROUP_DELETE_DESCRIPTION}
        tasks={groupedTasks[GROUP_DELETE]}
      />

      {isDialogOpen && (
        <Dialog closeFn={handleCloseDialog}>
          <div className="flex gap-3 flex-col" data-task={dialogType}>
            {dialogType === NEW && groupName && (
              <>
                <p className="title text-lg text-tma-blue-200">
                  {`${ADD_NEW_TASK} `}
                  <span className="font-black uppercase">{groupName}</span>
                </p>
                <Form />
              </>
            )}

            {dialogType === EDIT && currentTask && (
              <>
                <p className="title text-lg text-tma-blue-200 line-clamp-1">
                  {TASK_EDITING}{" "}
                  <span className="font-black uppercase">
                    {currentTask.name}
                  </span>
                </p>
                <Form />
              </>
            )}

            {dialogType === CONFIRMATION && currentTask && (
              <div className="flex flex-col gap-4">
                <p className="title text-lg text-tma-blue-200 line-clamp-1">
                  {`${REMOVING} `}
                  <span className="font-black">{currentTask.name}</span>
                </p>
                <p>{TASK_REMOVING}</p>
                <div className="flex gap-4">
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveTask(currentTask.id)}
                    // onClick={deleteTask}
                    className="uppercase"
                  >
                    {REMOVE_YES}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCloseDialog}
                    className="uppercase"
                  >
                    {REMOVE_NO}
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
