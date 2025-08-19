import { Plus } from "lucide-react";
import type { Tasks } from "../constants/types";
import { TaskListing } from "./task-listing";

type Props = {
  title: string;
  description: string;
  tasks: Tasks;
};

export const TaskElement = ({ title, description, tasks }: Props) => {
  const activeTasks = tasks?.filter((task) => task.active === true);
  const inactiveTasks = tasks?.filter((task) => task.active !== true);

  return (
    <div className="bg-tma-light-100 flex flex-col rounded-[20px] overflow-hidden">
      <div className="h-[76px] bg-tma-light-400 border-b border-b-tma-blue-200 flex justify-between items-center p-5">
        <div className="flex items-center gap-[10px] text-tma-blue-200 uppercase">
          <p className="leading-none font-black text-2xl">{title}</p>
          <p className="leading-none text-xl">{description}</p>
        </div>
        <span className="text-tma-blue-200 cursor-pointer">
          <Plus size={36} />
        </span>
      </div>
      <div className="overflow-auto">
        <TaskListing tasks={activeTasks} />
        {inactiveTasks.length > 0 && (
          <>
            <p className="p-5 pb-[10px] text-xl text-tma-light-600 uppercase">
              done
            </p>
            <TaskListing tasks={inactiveTasks} />
          </>
        )}
      </div>
    </div>
  );
};
