import {
  CONFIRMATION,
  EDIT,
  EDIT_TASK,
  REMOVE,
} from "../../constants/constants";
import type { DropdownOptionElement } from "../../constants/types";
import { useGlobalContext } from "../../contexts/helpers/use-global-context";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";

type Props = {
  element: DropdownOptionElement;
};

export const DropdownListingElement = ({ element }: Props) => {
  const isEdit = element.name === EDIT;
  const isRemove = element.name === REMOVE;

  const { setIsDropdownOpen } = useTaskContext();

  const { setDialogType } = useGlobalContext();

  const handleClick = () => {
    setIsDropdownOpen(false);
    if (isEdit) {
      setDialogType(EDIT_TASK);
    }
    if (isRemove) {
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
