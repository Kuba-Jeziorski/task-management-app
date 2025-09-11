import { Plus } from "lucide-react";
import { cn } from "../../utils/css";

type Props = {
  title: string;
  openFn: () => void;
};

export const AddNewRow = ({ title, openFn }: Props) => {
  return (
    <button className="w-full pr-3 cursor-pointer mb-3" onClick={openFn}>
      <div className="flex bg-tma-light-200 px-2 py-3 items-center gap-5 rounded-md">
        <div
          className={cn(
            "text-tma-blue-200 transition-all duration-300",
            "hover:text-tma-blue-100"
          )}
        >
          <Plus size={32} />
        </div>
        <p className="text-tma-blue-200 font-semibold text-lg">{title}</p>
      </div>
    </button>
  );
};
