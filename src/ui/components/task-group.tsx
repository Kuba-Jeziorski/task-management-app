import { Plus } from "lucide-react";

import { TaskListing } from "./task-listing";
import type { GroupName, Tasks } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { createPortal } from "react-dom";
import { Dialog } from "../primitives/dialog";
import { DONE, NEW } from "../../constants/constants";
import { Form } from "./form";

type Props = {
  title: GroupName;
  description: string;
  tasks: Tasks;
};

export const TaskGroup = ({ title, description, tasks }: Props) => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    setIsOpenDropdown,
    groupName,
    setGroupName,
  } = useTaskContext();

  const handleOpen = () => {
    setIsOpenDialog(true);
    setIsOpenDropdown(false);
    setGroupName(title);
  };

  const handleClose = () => {
    setIsOpenDialog(false);
    setGroupName(undefined);
  };

  const isOpenCondition = isOpenDialog && groupName === title;

  const activeTasks = tasks?.filter((task) => task.active === true);
  const inactiveTasks = tasks?.filter((task) => task.active !== true);

  return (
    <div className="bg-tma-light-100 flex flex-col rounded-[20px] overflow-hidden">
      <div className="h-[76px] bg-tma-light-400 border-b border-b-tma-blue-200 flex justify-between items-center p-5">
        <div className="flex items-center gap-[10px] text-tma-blue-200 uppercase">
          <p className="leading-none font-black text-2xl">{title}</p>
          <p className="leading-none text-xl">{description}</p>
        </div>
        <button
          className="text-tma-blue-200 cursor-pointer"
          onClick={handleOpen}
        >
          <Plus size={36} />
        </button>
      </div>
      <div className="flex-1 flex flex-col p-3 h-1/2">
        <div className="flex-1 overflow-y-auto">
          <TaskListing tasks={activeTasks} />
          {inactiveTasks.length > 0 && (
            <>
              <p className="p-5 pb-[10px] text-xl text-tma-light-600 uppercase">
                {DONE}
              </p>
              <TaskListing tasks={inactiveTasks} />
            </>
          )}
        </div>
      </div>
      {createPortal(
        <Dialog isOpen={isOpenCondition} closeFn={handleClose}>
          <div className="flex gap-3 flex-col">
            <p className="text-lg text-tma-blue-200">
              Add new task to the{" "}
              <span className="font-black uppercase">{title}</span> group
            </p>
            <Form type={NEW} groupName={title} />
          </div>
        </Dialog>,
        document.body
      )}
    </div>
  );
};
