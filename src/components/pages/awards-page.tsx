import { Plus } from "lucide-react";

import {
  COLLECTED_REWARDS,
  COLLECTED_REWARDS_TITLE,
  REWARDS,
  REWARDS_TITLE,
} from "../../constants/constants";
import { tooltipMessages } from "../../constants/tooltip-messages";
import { useBlockedRedirect } from "../../hooks/use-blocked-redirect";
import { cn } from "../../utils/css";
import { CustomTooltip } from "../tooltip/custom-tooltip";

export const AwardsPage = () => {
  useBlockedRedirect();

  const handleOpen = () => {
    console.log(`Dialog open`);
  };

  return (
    <div className="w-full flex gap-10">
      <div className="w-3/5 h-full bg-tma-light-100 flex flex-col rounded-[20px] overflow-hidden">
        <div className="bg-tma-light-400 border-b border-b-tma-blue-200 flex justify-between items-center px-5 py-4">
          <CustomTooltip title={tooltipMessages[REWARDS]}>
            <div className="flex flex-col text-tma-blue-200 uppercase">
              <p className="font-black text-2xl">{REWARDS_TITLE}</p>
            </div>
          </CustomTooltip>
        </div>
        <div className="flex-1 flex flex-col p-3 h-1/2 min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <button
              className="w-full pr-3  cursor-pointer"
              onClick={handleOpen}
            >
              <div className="flex bg-tma-light-200 px-2 py-3 items-center gap-5 rounded-md mb-3">
                <div
                  className={cn(
                    "text-tma-blue-200 transition-all duration-300",
                    "hover:text-tma-blue-100"
                  )}
                >
                  <Plus size={32} />
                </div>
                <p className="text-tma-blue-200 font-semibold text-lg">
                  Add new reward
                </p>
              </div>
            </button>
            {/* <TaskListing tasks={active} /> */}
            Rewards listing
          </div>
        </div>
      </div>
      <div className="w-2/5 h-full bg-tma-light-100 flex flex-col rounded-[20px] overflow-hidden">
        <div className="bg-tma-light-400 border-b border-b-tma-blue-200 flex justify-between items-center px-5 py-4">
          <CustomTooltip title={tooltipMessages[COLLECTED_REWARDS]}>
            <div className="flex flex-col text-tma-blue-200 uppercase">
              <p className="font-black text-2xl">{COLLECTED_REWARDS_TITLE}</p>
            </div>
          </CustomTooltip>
        </div>
        <div className="flex-1 flex flex-col p-3 h-1/2 min-h-0">
          collected rewards listing
        </div>
      </div>
    </div>
  );
};
