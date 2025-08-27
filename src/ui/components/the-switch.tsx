import { ACTIVE, INACTIVE } from "../../constants/constants";
import { cn } from "../../utils/css";

type SwitchProps = {
  isOn: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
};

export const Switch = ({ isOn, onToggle, isDisabled = false }: SwitchProps) => {
  return (
    <button
      type="button"
      className={cn(
        "relative rounded-lg border-2 border-tma-blue-200 h-8 w-50 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-no-drop"
      )}
      disabled={isDisabled}
      onClick={onToggle}
    >
      <div
        className={cn(
          "h-6 w-1/2 rounded-md absolute top-[2px] left-[2px] transition-transform duration-300",
          isOn
            ? "bg-tma-blue-200"
            : "bg-tma-light-600 translate-x-[calc(100%-4px)]"
        )}
      >
        <div className="flex w-full h-full items-center justify-center">
          <p className="text-tma-light-100 font-semibold text-sm uppercase leading-none">
            {isOn ? ACTIVE : INACTIVE}
          </p>
        </div>
      </div>
    </button>
  );
};
