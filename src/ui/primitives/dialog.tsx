import { X } from "lucide-react";
import type { GroupName } from "../../constants/types";
import { cn } from "../../utils/css";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  groupName: GroupName | undefined;
  setGroupName: React.Dispatch<React.SetStateAction<GroupName | undefined>>;
};

export const Dialog = ({
  children,
  isOpen,
  setIsOpen,
  groupName,
  setGroupName,
}: Props) => {
  const handleClose = () => {
    setIsOpen(false);
    setGroupName(undefined);
  };

  return (
    <>
      {isOpen && groupName && (
        <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-xs">
          <div
            className="w-full h-full bg-tma-light-700 opacity-25 absolute top-0 left-0"
            onClick={handleClose}
          ></div>
          <div className="relative z-1 w-xl bg-tma-light-100 rounded-xl shadow-xl shadow-gray-300/30 ring-1 ring-gray-200 p-3">
            <button
              className={cn(
                "absolute -top-10 -right-10 text-tma-blue-200 cursor-pointer transition-colors duration-300",
                "hover:text-tma-blue-100"
              )}
              onClick={handleClose}
            >
              <X size={36} />
            </button>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
