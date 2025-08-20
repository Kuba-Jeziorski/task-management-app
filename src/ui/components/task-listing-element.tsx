import { CircleCheck } from "lucide-react";
import type { Task } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";

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
      className="flex gap-5 items-center border-b border-b-tma-light-300 px-2 h-[52px]"
    >
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
            "text-tma-light-100 cursor-pointer transition-all duration-300 group"
          )}
        >
          {
            <CircleCheck
              size={32}
              className="fill-[#00227a] group-hover:fill-[#6174a8] transition-all duration-300"
            />
          }
        </button>
      )}
      {task.active === true ? (
        <p className="text-lg text-tma-light-600">{task.name}</p>
      ) : (
        <p className="text-lg text-tma-light-500 line-through">{task.name}</p>
      )}
    </div>
  );
};
