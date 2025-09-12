import { EllipsisVertical } from "lucide-react";
import { cn } from "../../utils/css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useTaskContext } from "../../contexts/helpers/use-task-context";
import {
  dropdownRewardOptionElements,
  dropdownTaskOptionElements,
} from "../../constants/dropdown-option-elements";
import { DropdownListing } from "./dropdown-listing";
import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import type { DropdownRecordType } from "../../constants/types";
import { DROPDOWN_REWARD, DROPDOWN_TASK } from "../../constants/constants";
import { useRewardContext } from "../../contexts/helpers/use-reward-context";

type Position = {
  x: number;
  y: number;
};

type Props = {
  recordId: number;
  dropdownRecordType: DropdownRecordType;
};

const initialPosition = { x: 0, y: 0 };

export const Dropdown = ({ recordId, dropdownRecordType }: Props) => {
  const { setIsDropdownOpen, isDropdownOpen } = useGlobalContext();
  const { currentTaskId, setCurrentTaskId } = useTaskContext();
  const { currentRewardId, setCurrentRewardId } = useRewardContext();

  const [position, setPosition] = useState<Position>(initialPosition);

  const isRecordTask = dropdownRecordType === DROPDOWN_TASK;
  const isRecordReward = dropdownRecordType === DROPDOWN_REWARD;

  const dropdownTaskOpenCondition =
    isDropdownOpen && currentTaskId === recordId;
  const dropdownRewardOpenCondition =
    isDropdownOpen && currentRewardId === recordId;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenDropdown: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();

    if (dropdownTaskOpenCondition || dropdownRewardOpenCondition) {
      setIsDropdownOpen(false);
    } else {
      if (isRecordTask) {
        setCurrentTaskId(recordId);
      }
      if (isRecordReward) {
        setCurrentRewardId(recordId);
      }
      setIsDropdownOpen(true);

      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isWrapperClickValid =
        wrapperRef.current && !wrapperRef.current.contains(e.target as Node);
      const isDropdownClickValid =
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node);

      if (isWrapperClickValid && isDropdownClickValid) {
        setIsDropdownOpen(false);
      }
    };

    if (dropdownTaskOpenCondition || dropdownRewardOpenCondition) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [
    dropdownTaskOpenCondition,
    dropdownRewardOpenCondition,
    setIsDropdownOpen,
  ]);

  return (
    <div ref={wrapperRef} className="w-7 flex justify-center items-center ml-2">
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
      {dropdownTaskOpenCondition &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{ right: `${position.x}px`, top: `${position.y}px` }}
            className={cn(
              "flex flex-col fixed bg-tma-light-100 shadow-xl shadow-gray-300/30 ring-1 ring-gray-200 rounded-lg overflow-hidden"
            )}
          >
            <DropdownListing listing={dropdownTaskOptionElements} />
          </div>,
          document.body
        )}
      {dropdownRewardOpenCondition &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{ right: `${position.x}px`, top: `${position.y}px` }}
            className={cn(
              "flex flex-col fixed bg-tma-light-100 shadow-xl shadow-gray-300/30 ring-1 ring-gray-200 rounded-lg overflow-hidden"
            )}
          >
            <DropdownListing listing={dropdownRewardOptionElements} />
          </div>,
          document.body
        )}
    </div>
  );
};
