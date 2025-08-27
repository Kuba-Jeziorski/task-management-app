import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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
  TASK_ACTIVITY,
  TASK_UNIQUE_NAME,
} from "../../constants/constants";
import { Switch } from "./the-switch";

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
        <div className="flex gap-4 items-center">
          <p className="capitalize">{`${TASK_ACTIVITY}:`}</p>
          <Switch
            isOn={localActivity}
            onToggle={handleToggleActivity}
            isDisabled={isNewForm}
          />
        </div>
        <div className="flex gap-4">
          <Button variant={"primary"} type="submit" className="uppercase">
            {SAVE_TASK}
          </Button>
          <Button
            variant={"danger"}
            type="reset"
            onClick={handleClose}
            className="uppercase"
          >
            {CANCEL}
          </Button>
        </div>
      </div>
    </form>
  );
};
