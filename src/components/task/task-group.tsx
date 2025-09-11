import { Gem } from "lucide-react";

import { TaskListing } from "./task-listing";
import type { GroupName, Tasks } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import {
  ADD_NEW_TASK,
  COMPLETED,
  NEW_TASK,
  URL_AWARDS_PAGE,
} from "../../constants/constants";
import { tooltipMessages } from "../../constants/tooltip-messages";
import { CustomTooltip } from "../tooltip/custom-tooltip";
import { Link } from "react-router";
import { cn } from "../../utils/css";
import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import { AddNewRow } from "../ui/add-new-row";

type TaskGroupProps = {
  title: GroupName;
  description: string;
  tasks: Tasks;
  points: number;
};

export const TaskGroup = ({
  title,
  description,
  tasks,
  points,
}: TaskGroupProps) => {
  const { setIsDropdownOpen, setGroupName } = useTaskContext();

  const { setDialogType } = useGlobalContext();

  const handleOpen = () => {
    setDialogType(NEW_TASK);
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
      <div className="bg-tma-light-400 border-b border-b-tma-blue-200 flex justify-between items-center px-5 py-2">
        <CustomTooltip title={tooltipMessages[title]}>
          <div className="flex flex-col text-tma-blue-200 uppercase">
            <p className="font-black text-2xl">{title}</p>
            <p className="leading-none text-xs font-semibold">{description}</p>
          </div>
        </CustomTooltip>
        <Link to={`/${URL_AWARDS_PAGE}`}>
          <div
            className={cn(
              "flex gap-[6px] items-center text-tma-blue-200 transition-all duration-300",
              "hover:text-tma-blue-100"
            )}
          >
            <span className="text-2xl font-semibold">{points}</span>
            <Gem size={26} />
          </div>
        </Link>
      </div>
      <div className="flex-1 flex flex-col p-3 h-1/2 min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <AddNewRow title={ADD_NEW_TASK} openFn={handleOpen} />
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
