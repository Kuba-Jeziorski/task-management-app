import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { FormRow } from "./form-row";
import type { Task } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";
import { Button } from "../primitives/button";
import { CANCEL, EDIT, NEW, SAVE_TASK } from "../../constants/constants";

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
          task.id === currentTaskId ? { ...task, name: data.taskName } : task
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="New task name" error={errors?.taskName?.message}>
        <input
          type="text"
          id="taskName"
          placeholder="placeholder"
          className={cn(
            "h-12 px-3 z-1 pt-4 border border-tma-blue-200 rounded-xl outline-0 text-base leading-none font-semibold",
            "placeholder-transparent"
          )}
          {...register("taskName", {
            required: "This field is required",
            validate: (value) => {
              const isUnique = !currentTasks.some(
                (task) => task.name === value
              );
              return isUnique || "Task name must be uniqe";
            },
          })}
        />
      </FormRow>
      <div className="flex gap-4 mt-4">
        <Button variant={"primary"}>{SAVE_TASK}</Button>
        <Button variant={"danger"} type="reset" onClick={handleClose}>
          {CANCEL}
        </Button>
      </div>
    </form>
  );
};
