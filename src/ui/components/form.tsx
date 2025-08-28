import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";

import { InputWrapper } from "./input-wrapper";
import type { Task } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";
import { Button } from "../primitives/button";
import {
  CANCEL,
  EDIT,
  NEW,
  REQUIRED_FIELD,
  SAVE_TASK,
  TASK_UNIQUE_NAME,
} from "../../constants/constants";

type FormValues = {
  taskName: string;
};

export const Form = () => {
  const {
    data: currentTasks,
    setData,
    dialogType,
    setDialogType,
    currentTaskId,
    groupName,
  } = useTaskContext();

  const isNewForm = dialogType === NEW;
  const isEditForm = dialogType === EDIT;

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
      taskName: taskToEdit ? taskToEdit?.name : "",
    },
  });

  const [localActivity, setLocalActivity] = useState(
    taskToEdit?.active ?? true
  );

  useEffect(() => {
    if (isEditForm && currentTaskId && taskToEdit) {
      reset({ taskName: taskToEdit.name });
    }
  }, [isEditForm, currentTaskId, taskToEdit, currentTasks, reset]);

  const onSubmit = (data: FormValues) => {
    if (isNewForm && groupName) {
      const lastId = currentTasks.at(-1)?.id;
      const newId = lastId ? lastId + 1 : 0;

      const newTask: Task = {
        active: true,
        group: groupName,
        id: newId,
        name: data.taskName,
      };

      setData((currentTasks) => [...currentTasks, newTask]);
      setDialogType(null);
      reset();
      return;
    }

    if (isEditForm && currentTaskId != null) {
      setData((currentTasks) =>
        currentTasks.map((task) =>
          task.id === currentTaskId
            ? { ...task, name: data.taskName, active: localActivity }
            : task
        )
      );
      setDialogType(null);
      reset();
      return;
    }
  };

  const handleClose = () => {
    reset();
    setDialogType(null);
  };

  const handleToggleActivity = () => {
    setLocalActivity((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={handleToggleActivity}
            className={cn(
              "text-tma-blue-200 cursor-pointer transition-all duration-300",
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
          <InputWrapper label="New task name" error={errors?.taskName?.message}>
            <input
              type="text"
              id="taskName"
              placeholder="placeholder"
              className={cn(
                "h-12 px-3 z-1 pt-4 border border-tma-blue-200 rounded-xl outline-0 text-base leading-none font-semibold",
                "placeholder-transparent"
              )}
              {...register("taskName", {
                required: REQUIRED_FIELD,
                validate: (value) => {
                  const newFormUniqueNameCondition = !currentTasks.some(
                    (task) => task.name === value
                  );
                  const editFormUniqueNameCondition = !currentTasks.some(
                    (task) => task.name === value && task.id !== currentTaskId
                  );

                  const isUnique = taskToEdit
                    ? editFormUniqueNameCondition
                    : newFormUniqueNameCondition;
                  return isUnique || TASK_UNIQUE_NAME;
                },
              })}
            />
          </InputWrapper>
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            variant={"secondary"}
            type="reset"
            onClick={handleClose}
            className="uppercase"
          >
            {CANCEL}
          </Button>
          <Button variant={"primary"} type="submit" className="uppercase">
            {SAVE_TASK}
          </Button>
        </div>
      </div>
    </form>
  );
};
