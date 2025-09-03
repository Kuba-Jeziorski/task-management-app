import { X } from "lucide-react";
import { cn } from "../../utils/css";
import { createPortal } from "react-dom";

import { useTaskContext } from "../../contexts/helpers/use-task-context";

type Props = {
  children: React.ReactNode;
  closeFn: () => void;
};

export const Dialog = ({ children, closeFn }: Props) => {
  const { dialogType } = useTaskContext();

  const isOpen = dialogType !== null;

  return (
    <>
      {isOpen &&
        createPortal(
          <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-xs">
            <div
              className="w-full h-full bg-tma-light-700 opacity-25 absolute top-0 left-0"
              onClick={closeFn}
            ></div>
            <div className="relative z-1 w-xl bg-tma-light-100 rounded-xl shadow-xl shadow-gray-300/30 ring-1 ring-gray-200 p-3">
              <button
                className={cn(
                  "absolute top-[6px] right-[6px] text-tma-blue-200 cursor-pointer transition-colors duration-300",
                  "hover:text-tma-blue-100"
                )}
                onClick={closeFn}
              >
                <X size={36} />
              </button>
              <div className="[&_.title]:pr-8 [&_.title]:line-clamp-1">
                {children}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
