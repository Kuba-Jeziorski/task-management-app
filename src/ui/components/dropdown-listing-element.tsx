import { EDIT, REMOVE } from "../../constants/constants";
import type { DropdownOptionElement } from "../../constants/types";
import { useTaskContext } from "../../contexts/helpers/use-task-context";
import { cn } from "../../utils/css";

type Props = {
  element: DropdownOptionElement;
};

export const DropdownListingElement = ({ element }: Props) => {
  const isEdit = element.name === EDIT;
  const isRemove = element.name === REMOVE;

  const { setData, setIsOpenDropdown, currentTaskId, setIsOpenDialog } =
    useTaskContext();

  const removeTask = () => {
    setData((prev) => prev.filter((task) => task.id !== currentTaskId));
  };

  const handleClick = () => {
    setIsOpenDropdown(false);
    if (isEdit) {
      setIsOpenDialog(true);
    }
    if (isRemove) {
      removeTask();
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
