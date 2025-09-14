import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";

import { InputWrapper } from "./input-wrapper";
import type { NewTask, Task, UpdateLog } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";
import { Button } from "../button/button";
import {
  ALL_POINTS,
  CANCEL,
  CURRENT_POINTS,
  EDIT_TASK,
  LOG_ADD_TASK,
  LOG_EDIT_TASK_ACTIVITY,
  LOG_EDIT_TASK_NAME,
  NEW_TASK,
  REQUIRED_FIELD,
  SAVE_TASK,
  TOOLTIP_TOGGLE_ACTIVE,
  TOOLTIP_TOGGLE_INACTIVE,
} from "../../constants/constants";
import { CustomTooltip } from "../tooltip/custom-tooltip";
import { useUpdateTask } from "../../hooks/use-update-task";
import { useCreateTask } from "../../hooks/use-create-task";
import { Input } from "./the-input";
import { usePoints } from "../../hooks/use-current-points";
import { taskGroupPoints } from "../../constants/task-group-points";
import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import { useProfile } from "../../hooks/use-profile";
import { useUpdateLog } from "../../hooks/use-update-log";
import { useLogs } from "../../hooks/use-logs";
import type {
  Log_AddTask,
  Log_EditTaskActivity,
  Log_EditTaskName,
} from "../../constants/log-action-variants";

type FormValues = {
  taskName: string;
};

export const TaskForm = () => {
  const { data: currentTasks, currentTaskId, groupName } = useTaskContext();

  const { dialogType, setDialogType } = useGlobalContext();

  const { profile } = useProfile();
  const userId = profile?.user_id;

  const { updateTask } = useUpdateTask();
  const { createTask } = useCreateTask();
  const { updatePoints, isUpdating } = usePoints();

  const { updateLog } = useUpdateLog();
  const { logs } = useLogs();

  const isNewForm = dialogType === NEW_TASK;
  const isEditForm = dialogType === EDIT_TASK;

  const taskToEdit =
    isEditForm && currentTaskId
      ? currentTasks.find((task) => task.id === currentTaskId)
      : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      taskName: taskToEdit?.name ?? "",
    },
  });

  const [localActivity, setLocalActivity] = useState(
    taskToEdit?.active ?? true
  );

  useEffect(() => {
    if (isEditForm && taskToEdit) {
      reset({ taskName: taskToEdit.name });
      setLocalActivity(taskToEdit.active);
    }
  }, [isEditForm, taskToEdit, reset]);

  const closeForm = useCallback(() => {
    reset();
    setDialogType(null);
  }, [reset, setDialogType]);

  const handleToggleActivity = () => {
    setLocalActivity((prev) => !prev);
  };

  const onSubmit = (data: FormValues) => {
    const currentLog: UpdateLog | undefined = logs?.at(-1);
    if (isNewForm && groupName) {
      const newTask: NewTask = {
        user_id: userId,
        name: data.taskName,
        group: groupName,
        active: true,
      };

      createTask(newTask);

      if (currentLog !== undefined) {
        const lastId = currentLog.actions.at(-1)?.id ?? 0;
        const newTaskAction: Log_AddTask = {
          id: lastId + 1,
          name: LOG_ADD_TASK,
          title: data.taskName,
          group: groupName,
        };

        const updatedLog: UpdateLog = {
          ...currentLog,
          actions: [...currentLog.actions, newTaskAction],
        };

        updateLog(updatedLog);
      }
    }

    if (isEditForm && currentTaskId != null) {
      if (taskToEdit) {
        if (currentLog !== undefined) {
          if (data.taskName !== taskToEdit.name) {
            const lastId = currentLog.actions.at(-1)?.id ?? 0;
            const taskNameChangeAction: Log_EditTaskName = {
              id: lastId + 1,
              name: LOG_EDIT_TASK_NAME,
              prevName: taskToEdit.name,
              newName: data.taskName,
              group: taskToEdit.group,
            };

            const updatedLog: UpdateLog = {
              ...currentLog,
              actions: [...currentLog.actions, taskNameChangeAction],
            };

            updateLog(updatedLog);
          }
          if (taskToEdit.active !== localActivity) {
            const lastId = currentLog.actions.at(-1)?.id ?? 0;
            const taskActivityChangeAction: Log_EditTaskActivity = {
              id: lastId + 1,
              name: LOG_EDIT_TASK_ACTIVITY,
              title: taskToEdit.name,
              newActivity: localActivity,
              group: taskToEdit.group,
            };

            const updatedLog: UpdateLog = {
              ...currentLog,
              actions: [...currentLog.actions, taskActivityChangeAction],
            };

            updateLog(updatedLog);
          }
        }

        const updatedTask: Task = {
          ...taskToEdit,
          name: data.taskName,
          active: localActivity,
        };
        updateTask(updatedTask);

        const pointsValue = updatedTask.active
          ? taskGroupPoints[updatedTask.group] * -1
          : taskGroupPoints[updatedTask.group];

        updatePoints({ pointsValue, pointsType: CURRENT_POINTS });
        updatePoints({ pointsValue, pointsType: ALL_POINTS });
      }
    }
    closeForm();
  };

  const tooltipMessage = !isNewForm
    ? localActivity
      ? TOOLTIP_TOGGLE_ACTIVE
      : TOOLTIP_TOGGLE_INACTIVE
    : "";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <CustomTooltip title={tooltipMessage}>
            <button
              type="button"
              disabled={isNewForm}
              onClick={handleToggleActivity}
              className={cn(
                "text-tma-blue-200 cursor-pointer transition-all duration-300",
                isNewForm && "opacity-50 pointer-events-none",
                localActivity
                  ? "hover:text-tma-blue-100"
                  : "[&:hover_svg]:fill-[#6174a8] [&:hover]:text-tma-blue-100"
              )}
            >
              {
                <CircleCheck
                  size={32}
                  className={cn(
                    !localActivity &&
                      "fill-[#00227a] transition-all duration-300 [&_path]:stroke-tma-light-100"
                  )}
                />
              }
            </button>
          </CustomTooltip>

          <InputWrapper label="New task name" error={errors?.taskName?.message}>
            <Input
              type="text"
              id="taskName"
              placeholder="placeholder"
              {...register("taskName", {
                required: REQUIRED_FIELD,
              })}
            />
          </InputWrapper>
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            variant={"secondary"}
            type="reset"
            onClick={closeForm}
            className="uppercase"
          >
            {CANCEL}
          </Button>
          <Button
            variant={"primary"}
            type="submit"
            className="uppercase"
            disabled={isUpdating}
          >
            {SAVE_TASK}
          </Button>
        </div>
      </div>
    </form>
  );
};
