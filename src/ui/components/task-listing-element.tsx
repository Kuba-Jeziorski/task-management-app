import { CircleCheck } from "lucide-react";
import type { Task } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";
import { Dropdown } from "./dropdown";

type TaskProps = {
  task: Task;
};

export const TaskListingElement = ({ task }: TaskProps) => {
  const { setData } = useTaskContext();

  const handleChangeActive = () => {
    setData((prev) =>
      prev.map((element) =>
        element.id === task.id
          ? { ...element, active: !element.active }
          : element
      )
    );
  };

  return (
    <div
      key={task.id}
      className={cn(
        "flex justify-between border-b border-b-tma-light-300 px-2 h-[52px] group transition-all duration-300",
        "hover:bg-tma-light-200"
      )}
    >
      <div className="flex gap-5 items-center">
        {task.active === true ? (
          <button
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
      <Dropdown taskId={task.id} />
    </div>
  );
};
