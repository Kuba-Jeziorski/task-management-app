import {
  ADD_NEW_TASK_TO,
  CONFIRMATION,
  GROUP_DECIDE_POINTS,
  GROUP_DELEGATE_POINTS,
  GROUP_DELETE_POINTS,
  GROUP_DO_POINTS,
  GROUP_DECIDE,
  GROUP_DECIDE_DESCRIPTION,
  GROUP_DELEGATE,
  GROUP_DELEGATE_DESCRIPTION,
  GROUP_DELETE,
  GROUP_DELETE_DESCRIPTION,
  GROUP_DO,
  GROUP_DO_DESCRIPTION,
  REMOVE_NO,
  REMOVE_YES,
  REMOVING,
  TASK_EDITING,
  TASK_REMOVING,
  NEW_TASK,
  EDIT_TASK,
} from "../../constants/constants";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { TaskGroup } from "./task-group";
import { TaskForm } from "../form/task-form";
import { Button } from "../button/button";
import type { Tasks } from "../../constants/types";
import { useTasks } from "../../hooks/use-tasks";
import { useRemoveTask } from "../../hooks/use-remove-task";
import { Spinner } from "../spinner/the-spinner";
import { Dialog } from "../dialog/dialog";
import { useGlobalContext } from "../../contexts/helpers/use-global-context";

type GroupedTasks = {
  [GROUP_DO]: Tasks;
  [GROUP_DECIDE]: Tasks;
  [GROUP_DELEGATE]: Tasks;
  [GROUP_DELETE]: Tasks;
};

export const TaskGrid = () => {
  const { currentTaskId, setCurrentTaskId, groupName, setGroupName } =
    useTaskContext();

  const { dialogType, setDialogType } = useGlobalContext();

  const { tasks: data = [], isLoading } = useTasks();
  const { removeTask } = useRemoveTask();

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
    (dialogType === NEW_TASK && groupName) ||
    (dialogType === EDIT_TASK && currentTaskId) ||
    (dialogType === CONFIRMATION && currentTaskId);

  const handleCloseDialog = () => {
    setDialogType(null);
    setGroupName(undefined);
    setCurrentTaskId(null);
  };

  const handleRemoveTask = async (id: number) => {
    if (currentTaskId != null) {
      removeTask(id);
    }
    handleCloseDialog();
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-10">
      <TaskGroup
        title={GROUP_DO}
        description={GROUP_DO_DESCRIPTION}
        tasks={groupedTasks[GROUP_DO]}
        points={GROUP_DO_POINTS}
      />
      <TaskGroup
        title={GROUP_DECIDE}
        description={GROUP_DECIDE_DESCRIPTION}
        tasks={groupedTasks[GROUP_DECIDE]}
        points={GROUP_DECIDE_POINTS}
      />
      <TaskGroup
        title={GROUP_DELEGATE}
        description={GROUP_DELEGATE_DESCRIPTION}
        tasks={groupedTasks[GROUP_DELEGATE]}
        points={GROUP_DELEGATE_POINTS}
      />
      <TaskGroup
        title={GROUP_DELETE}
        description={GROUP_DELETE_DESCRIPTION}
        tasks={groupedTasks[GROUP_DELETE]}
        points={GROUP_DELETE_POINTS}
      />

      {isDialogOpen && (
        <Dialog closeFn={handleCloseDialog}>
          <div className="flex gap-3 flex-col" data-task={dialogType}>
            {dialogType === NEW_TASK && groupName && (
              <>
                <p className="title text-lg text-tma-blue-200">
                  {`${ADD_NEW_TASK_TO} `}
                  <span className="font-black uppercase">{groupName}</span>
                </p>
                <TaskForm />
              </>
            )}

            {dialogType === EDIT_TASK && currentTask && (
              <>
                <p className="title text-lg text-tma-blue-200 line-clamp-1">
                  {TASK_EDITING}{" "}
                  <span className="font-black uppercase">
                    {currentTask.name}
                  </span>
                </p>
                <TaskForm />
              </>
            )}

            {dialogType === CONFIRMATION && currentTask && (
              <div className="flex flex-col gap-4">
                <p className="title text-lg text-tma-blue-200 line-clamp-1">
                  {`${REMOVING}: `}
                  <span className="font-black">{currentTask.name}</span>
                </p>
                <p>{TASK_REMOVING}</p>
                <div className="flex gap-4">
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveTask(currentTask.id)}
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
