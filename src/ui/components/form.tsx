import { useForm } from "react-hook-form";
import { FormRow } from "./form-row";
import type { FormType, GroupName, Task } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";
import { Button } from "../primitives/button";
import { EDIT, NEW } from "../../constants/constants";
import { useEffect } from "react";

type FormProps = {
  type: FormType;
  groupName?: GroupName;
};

type FormValues = {
  taskName: string;
};

export const Form = ({ type, groupName }: FormProps) => {
  const isNew = type === NEW;
  const isEdit = type === EDIT;

  const {
    data: currentTasks,
    setData,
    setIsOpenDialog: setIsOpen,
    currentTaskId,
  } = useTaskContext();

  const taskToEdit =
    isEdit && currentTaskId
      ? currentTasks.find((task) => task.id === currentTaskId)
      : "";

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
    if (isEdit && currentTaskId) {
      const taskToEdit = currentTasks.find((task) => task.id === currentTaskId);
      if (taskToEdit) {
        reset({ taskName: taskToEdit.name });
      }
    }
  }, [isEdit, currentTaskId, currentTasks, reset]);

  const onSubmit = (data: FormValues) => {
    if (isNew && groupName) {
      const lastId = currentTasks.at(-1)?.id;
      const newId = lastId ? lastId + 1 : 0;

      const newTask: Task = {
        active: true,
        group: groupName,
        id: newId,
        name: data.taskName,
      };

      setData((currentTasks) => [...currentTasks, newTask]);
      setIsOpen(false);
    }

    if (isEdit && currentTaskId != null) {
      setData((currentTasks) =>
        currentTasks.map((task) =>
          task.id === currentTaskId ? { ...task, name: data.taskName } : task
        )
      );
      setIsOpen(false);
      reset();
      return;
    }
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="New task name" error={errors?.taskName?.message}>
        <input
          type="text"
          id="taskName"
          placeholder="placeholder"
          className={cn(
            "h-12 px-3 pt-4 border border-tma-blue-200 rounded-xl outline-0 text-base leading-none font-semibold",
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
        <Button variant={"primary"}>Create a new task</Button>
        <Button variant={"danger"} type="reset" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
