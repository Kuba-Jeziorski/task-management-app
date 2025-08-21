import { EllipsisVertical } from "lucide-react";
import { cn } from "../../utils/css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { dropdownOptionElements } from "../../constants/dropdown-option-elements";
import { DropdownListing } from "./dropdown-listing";
import { Dialog } from "../primitives/dialog";
import { EDIT } from "../../constants/constants";
import { Form } from "./form";

type Position = {
  x: number;
  y: number;
};

type Props = {
  taskId: number;
};

const initialPosition = { x: 0, y: 0 };

export const Dropdown = ({ taskId }: Props) => {
  const {
    currentTaskId,
    setCurrentTaskId,
    isOpenDropdown,
    setIsOpenDropdown,
    isOpenDialog,
  } = useTaskContext();

  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDropdownOpenCondition, setIsDropdownOpenCondition] = useState(false);
  const [isDialogOpenCondition, setIsDialogOpenCondition] = useState(false);

  useEffect(() => {
    setIsDropdownOpenCondition(isOpenDropdown && currentTaskId === taskId);
  }, [isOpenDropdown, currentTaskId, taskId]);

  useEffect(() => {
    setIsDialogOpenCondition(isOpenDialog && currentTaskId === taskId);
  }, [isOpenDialog, currentTaskId, taskId]);

  const handleOpenDropdown: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();

    if (isDropdownOpenCondition) {
      setIsOpenDropdown(false);
      setCurrentTaskId(undefined);
    } else {
      setCurrentTaskId(taskId);
      setIsOpenDropdown(true);

      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpenCondition(false);
  };

  return (
    <div className="w-7 flex justify-center items-center ml-2">
      <button
        onClick={handleOpenDropdown}
        className={cn(
          "w-full justify-center items-center hidden cursor-pointer transition-all duration-300",
          "group-hover:flex",
          "[&:hover_span]:text-tma-blue-100"
        )}
      >
        <span className="text-tma-blue-200">
          <EllipsisVertical size={26} />
        </span>
      </button>
      {createPortal(
        isDropdownOpenCondition && (
          <div
            style={{ right: `${position.x}px`, top: `${position.y}px` }}
            className={cn(
              "flex flex-col fixed bg-tma-light-100 border-tma-blue-200 border rounded-lg overflow-hidden"
            )}
          >
            <DropdownListing listing={dropdownOptionElements} />
          </div>
        ),
        document.body
      )}
      {isDialogOpenCondition &&
        createPortal(
          <Dialog isOpen={isOpenDialog} closeFn={handleCloseDialog}>
            <div className="flex gap-3 flex-col">
              <p className="text-lg text-tma-blue-200">
                You are editing a task
              </p>
              <Form type={EDIT} />
            </div>
          </Dialog>,
          document.body
        )}
    </div>
  );
};
