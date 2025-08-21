import { EllipsisVertical } from "lucide-react";
import { cn } from "../../utils/css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { dropdownOptionElements } from "../../constants/dropdown-option-elements";
import { DropdownListing } from "./dropdown-listing";

type Position = {
  x: number;
  y: number;
};

type Props = {
  taskId: number;
};

const initialPosition = { x: 0, y: 0 };

export const Dropdown = ({ taskId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition);

  const { currentTaskId, setCurrentTaskId } = useTaskContext();

  const isCurrentTaskSelected = currentTaskId === taskId;
  const isOpenCondition = isOpen && isCurrentTaskSelected;

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpenCondition) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        buttonRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
      setCurrentTaskId(undefined);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const handleOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setCurrentTaskId(taskId);

    if (isCurrentTaskSelected) {
      setIsOpen(false);
      setCurrentTaskId(undefined);
    } else {
      setIsOpen(true);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  };

  return (
    <div className="w-7 flex justify-center items-center ml-2">
      <button
        ref={buttonRef}
        onClick={handleOpen}
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
        isOpenCondition && (
          <div
            ref={dropdownRef}
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
    </div>
  );
};
