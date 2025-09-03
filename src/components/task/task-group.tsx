import { Plus } from "lucide-react";

import { TaskListing } from "./task-listing";
import type { GroupName, Tasks } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { COMPLETED, NEW } from "../../constants/constants";
import { tooltipMessages } from "../../constants/tooltip-messages";
import { CustomTooltip } from "../tooltip/custom-tooltip";

type TaskGroupProps = {
  title: GroupName;
  description: string;
  tasks: Tasks;
};

export const TaskGroup = ({ title, description, tasks }: TaskGroupProps) => {
  const { setDialogType, setIsDropdownOpen, setGroupName } = useTaskContext();

  const handleOpen = () => {
    setDialogType(NEW);
    setIsDropdownOpen(false);
    setGroupName(title);
  };

  const { active, inactive } = tasks.reduce(
    (acc, task) => {
      if (task.active) {
        acc.active.push(task);
      } else {
        acc.inactive.push(task);
      }
      return acc;
    },
    { active: [] as Tasks, inactive: [] as Tasks }
  );

  return (
    <div className="bg-tma-light-100 flex flex-col rounded-[20px] overflow-hidden">
      <div className="h-[76px] bg-tma-light-400 border-b border-b-tma-blue-200 flex justify-between items-center p-5">
        <CustomTooltip title={tooltipMessages[title]}>
          <div className="flex items-center gap-[10px] text-tma-blue-200 uppercase">
            <p className="leading-none font-black text-2xl">{title}</p>
            <p className="leading-none text-xl">{description}</p>
          </div>
        </CustomTooltip>

        <button
          className="text-tma-blue-200 cursor-pointer"
          onClick={handleOpen}
        >
          <Plus size={36} />
        </button>
      </div>
      <div className="flex-1 flex flex-col p-3 h-1/2">
        <div className="flex-1 overflow-y-auto">
          <TaskListing tasks={active} />
          {inactive.length > 0 && (
            <>
              <p className="p-5 pb-[10px] text-xl text-tma-light-600 uppercase">
                {COMPLETED}
              </p>
              <TaskListing tasks={inactive} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
