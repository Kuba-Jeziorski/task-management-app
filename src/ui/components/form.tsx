import { useForm } from "react-hook-form";
import { FormRow } from "./form-row";
import type { GroupName, Task } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";
import { Button } from "../primitives/button";

type FormProps = {
  title: GroupName;
};

type FormValues = {
  newTaskName: string;
};

export const Form = ({ title }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { data: currentTasks, setData, setIsOpen } = useTaskContext();

  const onSubmit = (data: FormValues) => {
    const lastId = currentTasks.at(-1)?.id;
    const newId = lastId ? lastId + 1 : 0;

    const newTask: Task = {
      active: true,
      group: title,
      id: newId,
      name: data.newTaskName,
    };

    setData((currentTasks) => [...currentTasks, newTask]);
    setIsOpen(false);
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="New task name" error={errors?.newTaskName?.message}>
        <input
          type="text"
          id="newTaskName"
          placeholder="placeholder"
          className={cn(
            "h-12 px-3 pt-4 border border-tma-blue-200 rounded-xl outline-0 text-base leading-none font-semibold",
            "placeholder-transparent"
          )}
          disabled={false}
          {...register("newTaskName", { required: "This field is required" })}
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
