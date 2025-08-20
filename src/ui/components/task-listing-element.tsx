import { CircleCheck } from "lucide-react";
import type { Task } from "../../constants/types";

type TaskProps = {
  task: Task;
};

export const TaskListingElement = ({ task }: TaskProps) => {
  return (
    <div
      key={task.id}
      className="flex gap-5 items-center border-b border-b-tma-light-300 px-2 h-[52px]"
    >
      {task.active === true ? (
        <span className="text-tma-blue-200">{<CircleCheck size={32} />}</span>
      ) : (
        <span className="text-tma-light-100">
          {<CircleCheck size={32} fill="#00227a" />}
        </span>
      )}
      {task.active === true ? (
        <p className="text-lg text-tma-light-600">{task.name}</p>
      ) : (
        <p className="text-lg text-tma-light-500 line-through">{task.name}</p>
      )}
    </div>
  );
};
