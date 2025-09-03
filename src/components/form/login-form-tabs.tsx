import {
  LOG_IN,
  SIGN_UP,
  USER_FORM_LOGIN,
  USER_FORM_SIGNUP,
} from "../../constants/constants";
import type { UserFormType } from "../../constants/types";
import { cn } from "../../utils/css";

type Props = {
  currentTab: UserFormType;
  setCurrentTab: (type: UserFormType) => void;
};

export const LoginFormTabs = ({ currentTab, setCurrentTab }: Props) => {
  return (
    <div className="w-full flex border-b border-b-tma-blue-200">
      <button
        type="button"
        onClick={() => setCurrentTab(USER_FORM_LOGIN)}
        className={cn(
          "w-1/2 h-full cursor-pointer bg-tma-light-100 px-3 py-2 text-tma-blue-200 font-semibold uppercase transition-all duration-300 border-r border-r-tma-blue-200",
          "hover:bg-tma-blue-200 hover:text-tma-light-100",
          currentTab === USER_FORM_LOGIN && "bg-tma-blue-200 text-tma-light-100"
        )}
      >
        {LOG_IN}
      </button>
      <button
        type="button"
        onClick={() => setCurrentTab(USER_FORM_SIGNUP)}
        className={cn(
          "w-1/2 h-full cursor-pointer bg-tma-light-100 px-3 py-2 text-tma-blue-200 font-semibold uppercase transition-all duration-300",
          "hover:bg-tma-blue-200 hover:text-tma-light-100",
          currentTab === USER_FORM_SIGNUP &&
            "bg-tma-blue-200 text-tma-light-100"
        )}
      >
        {SIGN_UP}
      </button>
    </div>
  );
};
