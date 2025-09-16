import { CircleCheck } from "lucide-react";

import type { Task, UpdateLog } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";
import { Dropdown } from "../dropdown/dropdown";
import { CustomTooltip } from "../tooltip/custom-tooltip";
import {
  ALL_POINTS,
  CURRENT_POINTS,
  DROPDOWN_TASK,
  LOG_EDIT_TASK_ACTIVITY,
  TOOLTIP_TOGGLE_ACTIVE,
  TOOLTIP_TOGGLE_INACTIVE,
} from "../../constants/constants";
import { useUpdateTask } from "../../hooks/use-update-task";
import { usePoints } from "../../hooks/use-current-points";
import { taskGroupPoints } from "../../constants/task-group-points";
import { useUpdateLog } from "../../hooks/use-update-log";
import { useLogs } from "../../hooks/use-logs";
import type { Log_EditTaskActivity } from "../../constants/log-action-variants";

type TaskProps = {
  task: Task;
};

export const TaskListingElement = ({ task }: TaskProps) => {
  const { data: currentTasks } = useTaskContext();

  const { updateTask } = useUpdateTask();
  const { updatePoints, isUpdating } = usePoints();

  const { updateLog } = useUpdateLog();
  const { latestLog } = useLogs();

  const handleChangeActive = async () => {
    const taskToUpdate = currentTasks.find((element) => element.id === task.id);

    if (taskToUpdate) {
      if (latestLog !== undefined) {
        const lastId = latestLog.actions.at(-1)?.id ?? 0;

        const taskActivityChangeAction: Log_EditTaskActivity = {
          id: lastId + 1,
          name: LOG_EDIT_TASK_ACTIVITY,
          title: taskToUpdate.name,
          newActivity: !taskToUpdate.active,
          group: taskToUpdate.group,
        };

        const updatedLog: UpdateLog = {
          ...latestLog,
          actions: [...latestLog.actions, taskActivityChangeAction],
        };

        updateLog(updatedLog);
      }

      const updatedTask: Task = {
        ...taskToUpdate,
        active: !taskToUpdate.active,
      };
      updateTask(updatedTask);

      const pointsValue = updatedTask.active
        ? taskGroupPoints[updatedTask.group] * -1
        : taskGroupPoints[updatedTask.group];

      updatePoints({ pointsValue, pointsType: CURRENT_POINTS });
      updatePoints({ pointsValue, pointsType: ALL_POINTS });
    }
  };

  const tooltipMessage = task.active
    ? TOOLTIP_TOGGLE_ACTIVE
    : TOOLTIP_TOGGLE_INACTIVE;

  return (
    <div
      className={cn(
        "flex justify-between px-2 h-[52px] rounded-md group transition-all duration-300 shrink-0",
        "hover:bg-tma-light-200"
      )}
    >
      <div className="flex w-full h-full border-b border-b-tma-light-300">
        <div className="flex gap-5 items-center">
          <CustomTooltip title={tooltipMessage}>
            {task.active === true ? (
              <button
                disabled={isUpdating}
                onClick={handleChangeActive}
                className={cn(
                  "text-tma-blue-200 cursor-pointer transition-all duration-300",
                  "hover:text-tma-blue-100"
                )}
              >
                {<CircleCheck size={32} />}
              </button>
            ) : (
              <button
                disabled={isUpdating}
                onClick={handleChangeActive}
                className={cn(
                  "text-tma-blue-200 cursor-pointer transition-all duration-300",
                  "[&:hover_svg]:fill-[#6174a8] [&:hover]:text-tma-blue-100"
                )}
              >
                {
                  <CircleCheck
                    size={32}
                    className={cn(
                      "fill-[#00227a] transition-all duration-300",
                      "[&_path]:stroke-tma-light-100"
                    )}
                  />
                }
              </button>
            )}
          </CustomTooltip>
          {task.active === true ? (
            <p className="text-lg text-tma-light-600 line-clamp-1 leading-none">
              {task.name}
            </p>
          ) : (
            <p className="text-lg text-tma-light-500 line-through line-clamp-1 leading-none">
              {task.name}
            </p>
          )}
        </div>
      </div>
      <Dropdown dropdownRecordType={DROPDOWN_TASK} recordId={task.id} />
    </div>
  );
};
