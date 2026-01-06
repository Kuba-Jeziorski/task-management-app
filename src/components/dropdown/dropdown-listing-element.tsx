import {
  CONFIRMATION,
  DROPDOWN_NAME_REWARD_EDIT,
  DROPDOWN_NAME_REWARD_REMOVE,
  DROPDOWN_NAME_TASK_EDIT,
  DROPDOWN_NAME_TASK_REMOVE,
  EDIT_REWARD,
  EDIT_TASK,
} from "../../constants/constants";
import type { DropdownOptionElement } from "../../constants/types";
import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import { cn } from "../../utils/css";

type Props = {
  element: DropdownOptionElement;
};

export const DropdownListingElement = ({ element }: Props) => {
  const isEditingTask = element.name === DROPDOWN_NAME_TASK_EDIT;
  const isRemovingTask = element.name === DROPDOWN_NAME_TASK_REMOVE;

  const isEditingReward = element.name === DROPDOWN_NAME_REWARD_EDIT;
  const isRemovingReward = element.name === DROPDOWN_NAME_REWARD_REMOVE;

  const { setIsDropdownOpen } = useGlobalContext();

  const { setDialogType } = useGlobalContext();

  const handleClick = () => {
    setIsDropdownOpen(false);

    if (isEditingTask) {
      setDialogType(EDIT_TASK);
    }
    if (isEditingReward) {
      setDialogType(EDIT_REWARD);
    }
    if (isRemovingTask || isRemovingReward) {
      setDialogType(CONFIRMATION);
    }
  };

  return (
    <>
      <button
        key={element.name}
        onClick={handleClick}
        className={cn(
          "cursor-pointer flex items-center gap-3 px-3 py-1 transition-all duration-300 group",
          "hover:bg-tma-light-300"
        )}
      >
        <span className={cn(element.className)}>{element.icon}</span>
        <p
          className={cn("text-lg font-semibold capitalize", element.className)}
        >
          {element.name}
        </p>
      </button>
    </>
  );
};
